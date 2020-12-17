import { Injectable } from '@angular/core';
import { ObservableStore } from '@codewithdan/observable-store';
import { Observable, of } from 'rxjs';
import { StateModel } from '../State/state.model';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { ClassHttp } from './class.http';
import { ClassModel } from '../../common/models/class.model';
import { ClassStoreModel } from './class-store.model';
import { ClassStoreActions } from './class-store.actions';

@Injectable()
export class ClassStoreService extends ObservableStore<StateModel> {
    constructor(private classHttp: ClassHttp) {
        super({ trackStateHistory: false, logStateChanges: false });
    }

    private fetchClasses() {
        return this.classHttp.getClasses().pipe(
            map((classes: ClassModel[]) => {
                const state: ClassStoreModel = {
                    nextWeeksClasses: classes,
                };
                this.setState({ classes: state }, ClassStoreActions.Get);
                return classes;
            }),
            catchError(this.handleError)
        );
    }

    get(): Observable<ClassModel[]> {
        const state: StateModel = this.getState();
        if (state.classes) {
            return of(state.classes.nextWeeksClasses);
        } else {
            return this.fetchClasses();
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
