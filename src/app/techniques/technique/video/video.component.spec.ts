// import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// import { IonicModule, Platform } from '@ionic/angular';
//
// import { VideoComponent } from './video.component';
// import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
// import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
// import { TechniqueStoreServiceMock } from '../../../+state/Techniques/technique-store.service.mock';
// import { VideoSelector } from './video.selector';
//
// describe('VideoComponent', () => {
//     let component: VideoComponent;
//     let fixture: ComponentFixture<VideoComponent>;
//     let platformReadySpy;
//     let platformIsSpy;
//     let platformSpy;
//
//     beforeEach(async(() => {
//         platformReadySpy = Promise.resolve();
//         platformIsSpy = () => {
//             return true;
//         };
//
//         platformSpy = jasmine.createSpyObj('Platform', {
//             ready: platformReadySpy,
//             is: platformIsSpy,
//         });
//
//         TestBed.configureTestingModule({
//             declarations: [VideoComponent],
//             providers: [
//                 ScreenOrientation,
//                 {
//                     provide: TechniqueStoreService,
//                     useClass: TechniqueStoreServiceMock,
//                 },
//                 VideoSelector,
//                 { provide: Platform, useValue: platformSpy },
//             ],
//             imports: [IonicModule],
//         }).compileComponents();
//
//         fixture = TestBed.createComponent(VideoComponent);
//         component = fixture.componentInstance;
//         component.media = {
//             id: 186,
//             file_name: '37_329ce6a5',
//             file_type: 'mp4',
//             folder: '8/37/videos',
//             original_file_name: '1_06797abe.mp4',
//             publishedStatus: 'Draft',
//             uploadStatus: 'Uploaded',
//             size: '9919421',
//             views: 3,
//             url:
//                 'https://hapkido-convert-videos.s3-ap-southeast-2.amazonaws.com/8/37/videos/37_329ce6a5/Default/',
//             updatedAt: new Date('2020-12-07T01:02:18.000Z'),
//             tags: [],
//         };
//
//         component.device = {
//             isMobile: true,
//             isDesktop: false,
//             isMobileWeb: false,
//             isTablet: false,
//         };
//
//         fixture.detectChanges();
//     }));
//
//     it('should create', () => {
//         expect(component).toBeTruthy();
//     });
// });
