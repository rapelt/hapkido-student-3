import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { QuestionModel } from '../../common/models/question.model';

@Injectable({
    providedIn: 'root',
})
export class TechniquesHttp {
    techniqueUrl = 'http://localhost:8080/technique/';
    studentUrl = 'http://localhost:8080/student/';
    mediaUrl = 'http://localhost:8080/media/';
    questionUrl = 'http://localhost:8080/question/';

    constructor(private httpClient: HttpClient) {
        this.techniqueUrl = config['techniqueAPIEndpoint'];
        this.studentUrl = config['studentAPIEndpoint'];
        this.mediaUrl = config['APIEndpoint'] + 'media/';
        this.questionUrl = config['APIEndpoint'] + 'question/';
    }

    getAllTechniques(hbid): Observable<TechniqueModel[]> {
        return this.httpClient.get(
            this.techniqueUrl + 'all/' + hbid
        ) as Observable<TechniqueModel[]>;
    }

    setUnlearnTechnqiue(hbid, techniqueID): Observable<any> {
        return this.httpClient.post(
            this.studentUrl + 'unwatchedTechnique/add/' + hbid,
            { techniqueId: techniqueID }
        );
    }

    setLearnTechnqiue(hbid, techniqueID): Observable<any> {
        return this.httpClient.post(
            this.studentUrl + 'unwatchedTechnique/remove/' + hbid,
            { techniqueId: techniqueID }
        );
    }

    setFavouriteTechnqiue(hbid, techniqueID): Observable<any> {
        return this.httpClient.post(this.studentUrl + 'favourite/add/' + hbid, {
            techniqueId: techniqueID,
        });
    }

    setNotFavouriteTechnqiue(hbid, techniqueID): Observable<any> {
        return this.httpClient.post(
            this.studentUrl + 'favourite/remove/' + hbid,
            { techniqueId: techniqueID }
        );
    }

    updateMediaViews(mediaId): Observable<any> {
        return this.httpClient.post(this.mediaUrl + 'update-views/' + mediaId, {
            mediaId: mediaId,
        });
    }

    addQuestion(question: QuestionModel): Observable<any> {
        return this.httpClient.post(this.questionUrl + 'add', {
            question: question,
        });
    }

    likeQuestion(questionId, hbId): Observable<any> {
        return this.httpClient.post(this.questionUrl + 'like/' + questionId, {
            hb_id: hbId,
        });
    }

    removeLikeQuestion(questionId, hbId): Observable<any> {
        return this.httpClient.post(
            this.questionUrl + 'remove-like/' + questionId,
            {
                hb_id: hbId,
            }
        );
    }
}
