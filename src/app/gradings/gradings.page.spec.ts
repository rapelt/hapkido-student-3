import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingsPage } from './gradings.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GradingsSelector } from './gradings.selector';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { StudentStoreServiceMock } from '../+state/Student/student-store.service.mock';

describe('GradingsPage', () => {
    let component: GradingsPage;
    let fixture: ComponentFixture<GradingsPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [GradingsPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                GradingsSelector,
                {
                    provide: StudentStoreService,
                    useClass: StudentStoreServiceMock,
                },
            ],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(GradingsPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
