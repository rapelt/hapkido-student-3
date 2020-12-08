import { TestBed } from '@angular/core/testing';
import { TechniqueSelector } from './technique.selector';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../../+state/State/state.model';
import { getInitialState } from '../../+state/State/initial-state';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { techniqueTestData } from '../../zTestData/techniques.test.data';
import { TechniqueStoreServiceMock } from '../../+state/Techniques/technique-store.service.mock';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { SettingsStoreServiceMock } from '../../+state/Settings/settings-store.service.mock';

describe('TechniqueSelector', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
                {
                    provide: SettingsStoreService,
                    useClass: SettingsStoreServiceMock,
                },
            ],
        })
    );

    it('should be created', () => {
        const service: TechniqueSelector = TestBed.inject(TechniqueSelector);
        expect(service).toBeTruthy();
    });
});
