import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { OtherComponent } from './other.component';

describe('OtherComponent', () => {
  let component: OtherComponent;
  let fixture: ComponentFixture<OtherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OtherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
