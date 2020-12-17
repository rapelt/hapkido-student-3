import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GradingsPage } from './gradings.page';

describe('GradingsPage', () => {
  let component: GradingsPage;
  let fixture: ComponentFixture<GradingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GradingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GradingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
