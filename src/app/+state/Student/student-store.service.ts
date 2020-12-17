import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { TechniquesStoreActions } from '../Techniques/techniques-store.actions';
import { StateModel } from '../State/state.model';
import { TechniquesStoreModel } from '../Techniques/techniques-store.model';
import { catchError, map } from 'rxjs/operators';
import { TechniquesHttp } from '../Techniques/techniques.http';
import { TechniqueModel } from '../../common/models/technique';
import { throwError } from 'rxjs';
import { QuestionModel } from '../../common/models/question.model';
import { StudentHttp } from './student.http';
import { StudentModel } from '../../common/models/student.model';
import { StudentStoreModel } from './student-store.model';
import { StudentStoreActions } from './student-store.actions';

@Injectable()
export class StudentStoreService extends ObservableStore<StateModel> {
    constructor(private studentHttp: StudentHttp) {
        super({ trackStateHistory: false, logStateChanges: false });
    }

    private fetchStudent(hbid) {
        return this.studentHttp.getStudent(hbid).pipe(
            map((student: StudentModel) => {
                const state: StudentStoreModel = {
                    student: student,
                };
                this.setState({ student: state }, StudentStoreActions.Get);
                return student;
            }),
            catchError(this.handleError)
        );
    }

    get(): Observable<StudentModel> {
        const state: StateModel = this.getState();
        if (state.student && state.student.student) {
            return of(state.student.student);
        } else {
            return this.fetchStudent(state.authentication.user.username);
        }
    }

    private handleError(error: any) {
        console.error('server error:', error);
        if (error.error instanceof Error) {
            const errMessage = error.error.message;
            return throwError(errMessage);
        }
        return throwError(error || 'Server error');
    }
}
