import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../State/state.model';
import { getInitialState } from '../State/initial-state';
import { techniqueTestData } from '../../zTestData/techniques.test.data';
import { StudentModel } from '../../common/models/student.model';

export class StudentStoreServiceMock {
    get(): Observable<StudentModel> {
        return of();
    }

    stateChanged = of(this.getState());

    private getState() {
        const initState = getInitialState();
        return initState;
    }
}
