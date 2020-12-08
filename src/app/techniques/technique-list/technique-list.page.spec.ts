import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniqueListPage } from './technique-list.page';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { TechniqueSelector } from '../technique/technique.selector';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../../+state/Techniques/technique-store.service.mock';
import { TechniqueListSelector } from './technique-list.selector';
import { RouterTestingModule } from '@angular/router/testing';

describe('TechniqueListPage', () => {
    let component: TechniqueListPage;
    let fixture: ComponentFixture<TechniqueListPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TechniqueListPage],
            providers: [
                TechniqueListSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (id) => {
                                return '1';
                            },
                        }),
                    },
                },
            ],
            imports: [
                IonicModule.forRoot(),
                RouterTestingModule.withRoutes([]),
            ],
        }).compileComponents();

        fixture = TestBed.createComponent(TechniqueListPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('getTitle colour should return the title of the technique', async (done) => {
        component.setType = 'color';
        component.setId = 3;
        component.getTitle();

        component.title.subscribe((t) => {
            console.log(t);
            expect(t).toEqual('Yellow 3');
            done();
        });
    });

    it('getTitle set should return the title of the technique', async (done) => {
        component.setType = 'set';
        component.setId = 3;
        component.techniques$ = of([
            {
                id: 2,
                description: '',
                grade: 5,
                title: 'Son Mok Su 1',
                techniqueSet: {
                    id: 2,
                    name: 'Son Mok Su',
                },
                tags: [],
                media: [],
                questions: [],
                isUnwatched: true,
                isAvailable: true,
                isFavourite: false,
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        ]);
        component.getTitle();

        component.title.subscribe((t) => {
            console.log(t);
            expect(t).toEqual('Son Mok Su');
            done();
        });
    });
});
