import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TechniquePage } from './technique.page';
import { RouterTestingModule } from '@angular/router/testing';
import { TechniqueSelector } from './technique.selector';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { of } from 'rxjs';
import { TechniqueStoreServiceMock } from '../../+state/Techniques/technique-store.service.mock';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { SettingsStoreServiceMock } from '../../+state/Settings/settings-store.service.mock';
import { ActivatedRoute, Router } from '@angular/router';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('TechniquePage', () => {
    let component: TechniquePage;
    let fixture: ComponentFixture<TechniquePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [TechniquePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                TechniqueSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
                {
                    provide: SettingsStoreService,
                    useClass: SettingsStoreServiceMock,
                },
                {
                    provide: ActivatedRoute,
                    useValue: {
                        paramMap: of({
                            get: (id) => {
                                return '1';
                            },
                        }),
                        snapshot: {
                            _lastPathIndex: 7,
                        },
                    },
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(TechniquePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
