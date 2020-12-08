import { TestBed } from '@angular/core/testing';
import { TechniqueSelector } from './technique.selector';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../../+state/State/state.model';
import { getInitialState } from '../../+state/State/initial-state';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { techniqueTestData } from '../../zTestData/techniques.test.data';

describe('TechniqueSelector', () => {
    const getTechniques: Observable<TechniqueModel[]> = of([]);
    const stateChanged: Observable<StateModel> = of(getInitialState());
    const storeSpy = jasmine.createSpyObj(
        'TechniqueStoreService',
        { get: getTechniques },
        { stateChanged: stateChanged }
    );

    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [{ provide: TechniqueStoreService, useValue: storeSpy }],
        })
    );

    it('should be created', () => {
        const service: TechniqueSelector = TestBed.inject(TechniqueSelector);
        expect(service).toBeTruthy();
    });

    it('should sort by technique sets', () => {
        const service: TechniqueSelector = TestBed.inject(TechniqueSelector);
        const sortBySet = service.sortBySet(techniqueTestData());
        expect(sortBySet.length).toEqual(3);
        expect(sortBySet[0].techniqueSetTitle).toEqual('Makko Chigi');
        expect(sortBySet[0].numberOfTechniques).toEqual(2);
        expect(sortBySet[0].lowestGrade).toEqual(1);
        expect(sortBySet[0].highestGrade).toEqual(3);
        expect(sortBySet[0].numberOfUnwatchedTechniques).toEqual(1);

        expect(sortBySet[1].techniqueSetTitle).toEqual('Son Mok Su');
        expect(sortBySet[1].numberOfTechniques).toEqual(2);
        expect(sortBySet[1].lowestGrade).toEqual(5);
        expect(sortBySet[1].highestGrade).toEqual(7);

        expect(sortBySet[2].techniqueSetTitle).toEqual('Ee Bok Su');
        expect(sortBySet[2].numberOfTechniques).toEqual(2);
        expect(sortBySet[2].numberOfAvailableTechniques).toEqual(0);
    });

    it('should sort by colour', () => {
        const service: TechniqueSelector = TestBed.inject(TechniqueSelector);
        const sortByColour = service.sortByColor(techniqueTestData());

        expect(sortByColour.length).toEqual(6);
        expect(sortByColour[0].techniqueSetTitle).toEqual('Yellow 1');
        expect(sortByColour[0].lowestGrade).toEqual(1);
        expect(sortByColour[0].highestGrade).toEqual(1);
        expect(sortByColour[0].numberOfUnwatchedTechniques).toEqual(0);
        expect(sortByColour[0].numberOfAvailableTechniques).toEqual(1);
        expect(sortByColour[1].techniqueSetTitle).toEqual('Yellow 3');
        expect(sortByColour[2].techniqueSetTitle).toEqual('Blue 2');
    });
});
