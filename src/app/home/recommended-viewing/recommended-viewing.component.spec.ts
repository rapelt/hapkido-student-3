import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RecommendedViewingComponent } from './recommended-viewing.component';

describe('RecommendedViewingComponent', () => {
  let component: RecommendedViewingComponent;
  let fixture: ComponentFixture<RecommendedViewingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecommendedViewingComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RecommendedViewingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
