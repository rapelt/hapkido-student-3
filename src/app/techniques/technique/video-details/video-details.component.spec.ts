import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VideoDetailsComponent } from './video-details.component';
import { TechniqueListSelector } from '../../technique-list/technique-list.selector';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
import { TechniqueStoreServiceMock } from '../../../+state/Techniques/technique-store.service.mock';
import { techniqueTestData } from '../../../zTestData/techniques.test.data';

describe('VideoDetailsComponent', () => {
    let component: VideoDetailsComponent;
    let fixture: ComponentFixture<VideoDetailsComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [VideoDetailsComponent],
            providers: [
                TechniqueListSelector,
                {
                    provide: TechniqueStoreService,
                    useClass: TechniqueStoreServiceMock,
                },
            ],
            imports: [IonicModule.forRoot()],
        }).compileComponents();

        fixture = TestBed.createComponent(VideoDetailsComponent);
        component = fixture.componentInstance;
        component.technique = techniqueTestData()[0];
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
