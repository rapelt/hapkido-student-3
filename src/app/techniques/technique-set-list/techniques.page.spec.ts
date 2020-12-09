import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniquesPage } from './techniques.page';
import { TechniqueSelector } from './technique.selector';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../../+state/State/state.model';
import { getInitialState } from '../../+state/State/initial-state';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TechniquesSetListPage', () => {
    let component: TechniquesPage;
    let fixture: ComponentFixture<TechniquesPage>;
    const getTechniques: Observable<TechniqueModel[]> = of([]);
    const stateChanged: Observable<StateModel> = of(getInitialState());

    const storeSpy = jasmine.createSpyObj(
        'TechniqueStoreService',
        { get: getTechniques },
        { stateChanged: stateChanged }
    );

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [TechniquesPage],
            providers: [
                TechniqueSelector,
                { provide: TechniqueStoreService, useValue: storeSpy },
            ],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
        }).compileComponents();

        fixture = TestBed.createComponent(TechniquesPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('progress should return the progress bar value', () => {
        const progress = component.progress({
            techniqueSetId: 1,
            techniqueSetTitle: 'Makko Chigi',
            numberOfTechniques: 10,
            numberOfUnwatchedTechniques: 4,
            numberOfAvailableTechniques: 8,
            lowestGrade: 1,
            highestGrade: 2,
        });

        expect(progress).toEqual(0.5);
    });

    it('progressNumbers should return the progressNumbers values', () => {
        const progress = component.progressNumbers({
            techniqueSetId: 1,
            techniqueSetTitle: 'Makko Chigi',
            numberOfTechniques: 10,
            numberOfUnwatchedTechniques: 4,
            numberOfAvailableTechniques: 8,
            lowestGrade: 1,
            highestGrade: 2,
        });

        expect(progress).toEqual('4/8');
    });

    it('isLocked should return true if entire techniqueset is unavailable', () => {
        const isLocked = component.isLocked({
            techniqueSetId: 1,
            techniqueSetTitle: 'Makko Chigi',
            numberOfTechniques: 10,
            numberOfUnwatchedTechniques: 0,
            numberOfAvailableTechniques: 0,
            lowestGrade: 1,
            highestGrade: 2,
        });

        expect(isLocked).toEqual(true);
    });

    it('isLocked should return false if any technique is available in the set', () => {
        const isLocked = component.isLocked({
            techniqueSetId: 1,
            techniqueSetTitle: 'Makko Chigi',
            numberOfTechniques: 10,
            numberOfUnwatchedTechniques: 0,
            numberOfAvailableTechniques: 2,
            lowestGrade: 1,
            highestGrade: 2,
        });

        expect(isLocked).toEqual(false);
    });

    it('numberOfUnavailableTechniques should return the number of unavaliable technique', () => {
        const unavailable = component.numberOfUnavailableTechniques({
            techniqueSetId: 1,
            techniqueSetTitle: 'Makko Chigi',
            numberOfTechniques: 10,
            numberOfUnwatchedTechniques: 0,
            numberOfAvailableTechniques: 2,
            lowestGrade: 1,
            highestGrade: 2,
        });

        expect(unavailable).toEqual(8);
    });
});
