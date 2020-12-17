import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UpcomingClassesComponent } from './upcoming-classes.component';
import { AttendancePage } from '../../attendance/attendance.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AttendanceSelector } from '../../attendance/attendance.selector';
import { StudentStoreService } from '../../+state/Student/student-store.service';
import { StudentStoreServiceMock } from '../../+state/Student/student-store.service.mock';
import { RouterTestingModule } from '@angular/router/testing';
import { ClassStoreService } from '../../+state/Classes/class-store.service';
import { ClassStoreServiceMock } from '../../+state/Classes/class-store.service.mock';
import { UpcomingClassesSelector } from './upcoming-classes.selector';

describe('UpcomingClassesComponent', () => {
    let component: UpcomingClassesComponent;
    let fixture: ComponentFixture<UpcomingClassesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [UpcomingClassesComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                UpcomingClassesSelector,
                {
                    provide: ClassStoreService,
                    useClass: ClassStoreServiceMock,
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(UpcomingClassesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
