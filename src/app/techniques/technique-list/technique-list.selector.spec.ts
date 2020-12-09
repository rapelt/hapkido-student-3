import { TestBed } from '@angular/core/testing';
import { TechniqueListSelector } from './technique-list.selector';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { StateModel } from '../../+state/State/state.model';
import { getInitialState } from '../../+state/State/initial-state';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { techniqueTestData } from '../../zTestData/techniques.test.data';
import { TechniqueStoreServiceMock } from '../../+state/Techniques/technique-store.service.mock';

describe('TechniqueListSelector', () => {
    beforeEach(() =>
        TestBed.configureTestingModule({
            providers: [
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
            ],
        })
    );

    it('should be created', () => {
        const service: TechniqueListSelector = TestBed.inject(
            TechniqueListSelector
        );
        expect(service).toBeTruthy();
    });

    it('should get technique list', async (done) => {
        const service: TechniqueListSelector = TestBed.inject(
            TechniqueListSelector
        );
        service.getTechniques('set', 1).subscribe((result) => {
            expect(result.length).toEqual(2);
            expect(result[0].title).toEqual('Makko Chigi 1');
            expect(result[1].title).toEqual('Makko Chigi 2');

            done();
        });
    });
});
