import { Observable, of } from 'rxjs';
import { getInitialState } from '../State/initial-state';
import { StudentModel } from '../../common/models/student.model';

export class ClassStoreServiceMock {
    get(): Observable<StudentModel> {
        return of();
    }

    stateChanged = of(this.getState());

    private getState() {
        const initState = getInitialState();
        return initState;
    }
}
