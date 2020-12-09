import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { FolderPage } from './folder.page';

xdescribe('FolderPage', () => {
    let component: FolderPage;
    let fixture: ComponentFixture<FolderPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [FolderPage],
            imports: [IonicModule, RouterModule.forRoot([])],
        }).compileComponents();

        fixture = TestBed.createComponent(FolderPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
