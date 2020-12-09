import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherComponent } from './other.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('OtherComponent', () => {
    let component: OtherComponent;
    let fixture: ComponentFixture<OtherComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OtherComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(OtherComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
