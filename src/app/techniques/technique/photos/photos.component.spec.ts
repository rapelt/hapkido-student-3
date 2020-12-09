import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PhotosComponent } from './photos.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PhotosComponent', () => {
    let component: PhotosComponent;
    let fixture: ComponentFixture<PhotosComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PhotosComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule],
        }).compileComponents();

        fixture = TestBed.createComponent(PhotosComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
