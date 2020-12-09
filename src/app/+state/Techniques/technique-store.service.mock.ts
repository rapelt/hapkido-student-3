import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../State/state.model';
import { getInitialState } from '../State/initial-state';
import { techniqueTestData } from '../../zTestData/techniques.test.data';

export class TechniqueStoreServiceMock {
    getTechniques(): Observable<TechniqueModel[]> {
        return of(techniqueTestData());
    }

    get(): Observable<TechniqueModel[]> {
        return of(techniqueTestData());
    }

    stateChanged = of(this.getState());

    private getState() {
        const initState = getInitialState();
        initState.techniques = {
            techniques: null,
            playlist: null,
            techniqueFilter: null,
        };
        initState.techniques.techniques = techniqueTestData();
        return initState;
    }
}
