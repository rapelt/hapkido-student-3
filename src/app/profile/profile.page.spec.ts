import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ProfilePage } from './profile.page';
import { TechniquePage } from '../techniques/technique/technique.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TechniqueSelector } from '../techniques/technique/technique.selector';
import { TechniqueStoreService } from '../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../+state/Techniques/technique-store.service.mock';
import { SettingsStoreService } from '../+state/Settings/settings-store.service';
import { SettingsStoreServiceMock } from '../+state/Settings/settings-store.service.mock';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ProfileSelector } from './profile.selector';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { StudentStoreServiceMock } from '../+state/Student/student-store.service.mock';
import { AuthStoreService } from '../+state/Authentication/auth-store.service';
import { AuthStoreServiceMock } from '../+state/Authentication/auth-store.service.mock';

describe('ProfilePage', () => {
    let component: ProfilePage;
    let fixture: ComponentFixture<ProfilePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ProfilePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                ProfileSelector,
                {
                    provide: StudentStoreService,
                    useClass: StudentStoreServiceMock,
                },
                {
                    provide: AuthStoreService,
                    useClass: AuthStoreServiceMock,
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(ProfilePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
