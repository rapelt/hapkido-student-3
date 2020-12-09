import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestionComponent } from './question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSelector } from '../comments/comment.selector';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../../../+state/Techniques/technique-store.service.mock';
import { QuestionSelector } from './question.selector';
import { AuthStoreService } from '../../../+state/Authentication/auth-store.service';
import { AuthStoreServiceMock } from '../../../+state/Authentication/auth-store.service.mock';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('QuestionComponent', () => {
    let component: QuestionComponent;
    let fixture: ComponentFixture<QuestionComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            declarations: [QuestionComponent],
            providers: [
                QuestionSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
                {
                    provide: AuthStoreService,
                    useClass: AuthStoreServiceMock,
                },
            ],
            imports: [IonicModule, ReactiveFormsModule, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(QuestionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
