import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';

import { CategoriesComponent } from './categories.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('CategoriesComponent', () => {
    let component: CategoriesComponent;
    let fixture: ComponentFixture<CategoriesComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CategoriesComponent],
            imports: [RouterTestingModule.withRoutes([]), IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CategoriesComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
