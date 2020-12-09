import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SomethingComponent } from './something.component';

describe('SomethingComponent', () => {
    let component: SomethingComponent;
    let fixture: ComponentFixture<SomethingComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SomethingComponent],
            imports: [IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(SomethingComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
