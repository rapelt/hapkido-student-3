import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { TechniquesStoreActions } from './techniques-store.actions';
import { StateModel } from '../State/state.model';
import { TechniquesStoreModel } from './techniques-store.model';
import { catchError, map } from 'rxjs/operators';
import { TechniquesHttp } from './techniques.http';
import { TechniqueModel } from '../../common/models/technique';
import { throwError } from 'rxjs';
import { QuestionModel } from '../../common/models/question.model';

@Injectable()
export class TechniqueStoreService extends ObservableStore<StateModel> {
    constructor(private techniqueHttp: TechniquesHttp) {
        super({ trackStateHistory: true, logStateChanges: true });
    }

    private fetchTechniques(username) {
        return this.techniqueHttp.getAllTechniques(username).pipe(
            map((techniques: TechniqueModel[]) => {
                const playlist = techniques
                    .filter((t) => t.isFavourite)
                    .map((t) => t.id);

                console.log('playlist', playlist);

                const state: TechniquesStoreModel = {
                    techniques: techniques,
                    playlist: playlist,
                    techniqueFilter: 'favourites',
                };
                this.setState(
                    { techniques: state },
                    TechniquesStoreActions.Get
                );
                return techniques;
            }),
            catchError(this.handleError)
        );
    }

    private setUnlearntTechniquedb(username, techniqueId) {
        const sub = this.techniqueHttp
            .setUnlearnTechnqiue(username, techniqueId)
            .pipe(
                map((technique) => {
                    const state: StateModel = this.getState();
                    const index = state.techniques.techniques.findIndex(
                        (t) => t.id === techniqueId
                    );
                    state.techniques.techniques[index].isUnwatched = true;
                    this.setState(state, TechniquesStoreActions.setPlaylist);
                }),
                catchError((err) => {
                    return this.handleErrorUnlearnt(err, techniqueId);
                })
            )
            .subscribe();
    }

    private setLearntTechniquedb(username, techniqueId) {
        const sub = this.techniqueHttp
            .setLearnTechnqiue(username, techniqueId)
            .pipe(
                map((technique) => {
                    const state: StateModel = this.getState();
                    const index = state.techniques.techniques.findIndex(
                        (t) => t.id === techniqueId
                    );
                    state.techniques.techniques[index].isUnwatched = false;
                    this.setState(state, TechniquesStoreActions.setPlaylist);
                }),
                catchError((err) => {
                    return this.handleErrorLearnt(err, techniqueId);
                })
            )
            .subscribe();
    }

    private setNotFavouriteTechniquedb(username, techniqueId) {
        const sub = this.techniqueHttp
            .setNotFavouriteTechnqiue(username, techniqueId)
            .pipe(
                map((technique) => {
                    const state: StateModel = this.getState();
                    state.techniques.playlist = state.techniques.playlist.filter(
                        (t) => t !== techniqueId
                    );
                    const index = state.techniques.techniques.findIndex(
                        (t) => t.id === techniqueId
                    );
                    state.techniques.techniques[index].isFavourite = false;
                    this.setState(state, TechniquesStoreActions.setPlaylist);
                }),
                catchError((err) => {
                    return this.removeAsFavouriteError(err, techniqueId);
                })
            )
            .subscribe();
    }

    private addQuestionDb(question: QuestionModel) {
        return this.techniqueHttp.addQuestion(question).pipe(
            map((q: QuestionModel) => {
                const state: StateModel = this.getState();
                const index = state.techniques.techniques.findIndex(
                    (t) => t.id === q.t_id
                );
                state.techniques.techniques[index].questions.push(q);
                this.setState(state, TechniquesStoreActions.addQuestion);

                return state.techniques.techniques[index].questions.find(
                    (topLevelQuestion) => {
                        return topLevelQuestion.id === q.replay_id;
                    }
                );
            }),
            catchError((err) => {
                return this.addQuestionError(err, question);
            })
        );
    }

    private likeQuestionDb(qId, hbId, t_id) {
        return this.techniqueHttp
            .likeQuestion(qId, hbId)
            .pipe(
                catchError((err) => {
                    this.removelikeQuestionState(qId, hbId, t_id);
                    return this.handleError(err);
                })
            )
            .subscribe();
    }

    private removeLikeQuestionDb(qId, hbId, t_id) {
        return this.techniqueHttp
            .removeLikeQuestion(qId, hbId)
            .pipe(
                catchError((err) => {
                    this.likeQuestionState(qId, hbId, t_id);
                    return this.handleError(err);
                })
            )
            .subscribe();
    }

    private setFavouriteTechniquedb(username, techniqueId) {
        const sub = this.techniqueHttp
            .setFavouriteTechnqiue(username, techniqueId)
            .pipe(
                map((technique) => {
                    const state: StateModel = this.getState();
                    state.techniques.playlist.push(techniqueId);
                    const index = state.techniques.techniques.findIndex(
                        (t) => t.id === techniqueId
                    );
                    state.techniques.techniques[index].isFavourite = true;
                    this.setState(state, TechniquesStoreActions.setPlaylist);
                }),
                catchError((err) => {
                    return this.setAsFavouriteError(err, techniqueId);
                })
            )
            .subscribe();
    }

    private updateViewsDb(mediaId) {
        const sub = this.techniqueHttp
            .updateMediaViews(mediaId)
            .pipe(
                catchError((err) => {
                    return this.handleError(err);
                })
            )
            .subscribe();
    }

    get(): Observable<TechniqueModel[]> {
        const state: StateModel = this.getState();
        if (state.techniques && state.techniques.techniques) {
            return of(state.techniques.techniques);
        } else {
            // call server and get data
            // assume async call here that returns observable
            return this.fetchTechniques(state.authentication.user.username);
        }
    }

    setPlaylist(playlist: number[]) {
        const state: StateModel = this.getState();
        state.techniques.playlist = playlist;
        this.setState(state, TechniquesStoreActions.setPlaylist);
    }

    setTechniqueFilter(filter: string) {
        const state: StateModel = this.getState();
        state.techniques.techniqueFilter = filter;
        this.setState(state, TechniquesStoreActions.setTechniqueFilter);
    }

    setLearnTechnique(techniqueId: number) {
        const state: StateModel = this.getState();
        return this.setLearntTechniquedb(
            state.authentication.user.username,
            techniqueId
        );
    }

    addQuestion(question: QuestionModel) {
        const state: StateModel = this.getState();
        question.hb_id = state.authentication.user.username;
        return this.addQuestionDb(question);
    }

    updateViews(mediaId: number) {
        return this.updateViewsDb(mediaId);
    }

    setUnlearnTechnique(techniqueId: number) {
        const state: StateModel = this.getState();
        return this.setUnlearntTechniquedb(
            state.authentication.user.username,
            techniqueId
        );
    }

    setFavourite(techniqueId: number) {
        const state: StateModel = this.getState();
        return this.setFavouriteTechniquedb(
            state.authentication.user.username,
            techniqueId
        );
    }

    removeFavourite(techniqueId: number) {
        const state: StateModel = this.getState();
        return this.setNotFavouriteTechniquedb(
            state.authentication.user.username,
            techniqueId
        );
    }

    likeQuestion(q_id, t_id) {
        const state: StateModel = this.getState();
        this.likeQuestionState(q_id, state.authentication.user.username, t_id);
        return this.likeQuestionDb(
            q_id,
            state.authentication.user.username,
            t_id
        );
    }

    removeLikeQuestion(q_id, t_id) {
        const state: StateModel = this.getState();
        this.removelikeQuestionState(
            q_id,
            state.authentication.user.username,
            t_id
        );
        return this.removeLikeQuestionDb(
            q_id,
            state.authentication.user.username,
            t_id
        );
    }

    resetState(): StateModel {
        const state: StateModel = this.getState();
        this.setState({ techniques: null }, TechniquesStoreActions.resetState);
        return state;
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return throwError(errMessage);
        }
        return throwError(error || 'Server error');
    }

    private handleErrorLearnt(error: any, techniqueId: number) {
        const state: StateModel = this.getState();
        const index = state.techniques.techniques.findIndex((t) => {
            return t.id === techniqueId;
        });

        state.techniques.techniques[index].isUnwatched = true;

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.setLearntTechniqueError
        );

        return this.handleError(error);
    }

    private handleErrorUnlearnt(error: any, techniqueId: number) {
        const state: StateModel = this.getState();
        const index = state.techniques.techniques.findIndex((t) => {
            return t.id === techniqueId;
        });

        state.techniques.techniques[index].isUnwatched = false;

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.setUnLearnTechniqueError
        );

        return this.handleError(error);
    }

    private removeAsFavouriteError(error: any, techniqueId: number) {
        const state: StateModel = this.getState();
        const index = state.techniques.techniques.findIndex((t) => {
            return t.id === techniqueId;
        });

        state.techniques.techniques[index].isFavourite = true;

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.removeFavouriteError
        );

        return this.handleError(error);
    }

    private setAsFavouriteError(error: any, techniqueId: number) {
        const state: StateModel = this.getState();
        const index = state.techniques.techniques.findIndex((t) => {
            return t.id === techniqueId;
        });

        state.techniques.techniques[index].isFavourite = false;

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.setFavouriteError
        );

        return this.handleError(error);
    }

    private addQuestionError(error: any, question: QuestionModel) {
        return this.handleError(error);
    }

    private removelikeQuestionState(questionId: number, hb_id, t_id) {
        const state: StateModel = this.getState();
        const t_index = state.techniques.techniques.findIndex((t) => {
            return t.id === t_id;
        });

        const q_index = state.techniques.techniques[
            t_index
        ].questions.findIndex((q) => {
            return q.id === questionId;
        });

        state.techniques.techniques[t_index].questions[q_index].likes.filter(
            (l) => {
                return l !== hb_id;
            }
        );

        state.techniques.techniques[t_index].questions[q_index].likes = [
            ...state.techniques.techniques[t_index].questions[
                q_index
            ].likes.filter((l) => {
                return l !== hb_id;
            }),
        ];

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.removeLike
        );
    }

    private likeQuestionState(questionId: number, hb_id, t_id) {
        const state: StateModel = this.getState();
        const t_index = state.techniques.techniques.findIndex((t) => {
            return t.id === t_id;
        });

        const q_index = state.techniques.techniques[
            t_index
        ].questions.findIndex((q) => {
            return q.id === questionId;
        });

        state.techniques.techniques[t_index].questions[q_index].likes = [
            ...state.techniques.techniques[t_index].questions[q_index].likes,
            hb_id,
        ];

        this.setState(
            { techniques: state.techniques },
            TechniquesStoreActions.like
        );
    }
}
