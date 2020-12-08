import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CommentsComponent } from './comments.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentSelector } from './comment.selector';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../../../+state/Techniques/technique-store.service.mock';

describe('CommentsComponent', () => {
    let component: CommentsComponent;
    let fixture: ComponentFixture<CommentsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [CommentsComponent],
            providers: [
                CommentSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
            ],
            imports: [IonicModule.forRoot(), ReactiveFormsModule, FormsModule],
        }).compileComponents();

        fixture = TestBed.createComponent(CommentsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
