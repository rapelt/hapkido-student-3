import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { InformationComponent } from './information.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('InformationComponent', () => {
    let component: InformationComponent;
    let fixture: ComponentFixture<InformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [InformationComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(InformationComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
