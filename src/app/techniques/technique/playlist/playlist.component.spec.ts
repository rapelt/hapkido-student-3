import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlaylistComponent } from './playlist.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PlaylistComponent', () => {
    let component: PlaylistComponent;
    let fixture: ComponentFixture<PlaylistComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PlaylistComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            imports: [IonicModule, RouterTestingModule.withRoutes([])],
        }).compileComponents();

        fixture = TestBed.createComponent(PlaylistComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
