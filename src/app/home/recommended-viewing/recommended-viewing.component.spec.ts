import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendedViewingComponent } from './recommended-viewing.component';
import { UpcomingClassesComponent } from '../upcoming-classes/upcoming-classes.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { UpcomingClassesSelector } from '../upcoming-classes/upcoming-classes.selector';
import { ClassStoreService } from '../../+state/Classes/class-store.service';
import { ClassStoreServiceMock } from '../../+state/Classes/class-store.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../../+state/Techniques/technique-store.service.mock';
import { RecommendedViewingSelector } from './recommended-viewing.selector';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { SettingsStoreServiceMock } from '../../+state/Settings/settings-store.service.mock';
import { CommonModule } from '@angular/common';

describe('RecommendedViewingComponent', () => {
    let component: RecommendedViewingComponent;
    let fixture: ComponentFixture<RecommendedViewingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [RecommendedViewingComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                RecommendedViewingSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
                {
                    provide: SettingsStoreService,
                    useClass: SettingsStoreServiceMock,
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(RecommendedViewingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
