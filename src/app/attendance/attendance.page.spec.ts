import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AttendancePage } from './attendance.page';
import { ProfilePage } from '../profile/profile.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProfileSelector } from '../profile/profile.selector';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { StudentStoreServiceMock } from '../+state/Student/student-store.service.mock';
import { AuthStoreService } from '../+state/Authentication/auth-store.service';
import { AuthStoreServiceMock } from '../+state/Authentication/auth-store.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { AttendanceSelector } from './attendance.selector';

describe('AttendancePage', () => {
    let component: AttendancePage;
    let fixture: ComponentFixture<AttendancePage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AttendancePage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                AttendanceSelector,
                {
                    provide: StudentStoreService,
                    useClass: StudentStoreServiceMock,
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(AttendancePage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
