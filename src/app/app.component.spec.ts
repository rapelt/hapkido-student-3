import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { AuthLibModule } from 'hapkido-auth-lib';
import { config } from '../environments/environment.test';
import { AuthStoreService } from './+state/Authentication/auth-store.service';
import { StateStoreService } from './+state/State/state-store.service';
import { SettingsStoreService } from './+state/Settings/settings-store.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';

describe('AppComponent', () => {
    let statusBarSpy;
    let splashScreenSpy;
    let platformReadySpy;
    let platformIsSpy;
    let platformSpy;

    beforeEach(async(() => {
        statusBarSpy = jasmine.createSpyObj('StatusBar', ['styleDefault']);
        splashScreenSpy = jasmine.createSpyObj('SplashScreen', ['hide']);
        platformReadySpy = Promise.resolve();
        platformIsSpy = () => {
            return true;
        };

        platformSpy = jasmine.createSpyObj('Platform', {
            ready: platformReadySpy,
            is: platformIsSpy,
        });

        TestBed.configureTestingModule({
            declarations: [AppComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
            providers: [
                { provide: StatusBar, useValue: statusBarSpy },
                { provide: SplashScreen, useValue: splashScreenSpy },
                { provide: Platform, useValue: platformSpy },
                AuthStoreService,
                StateStoreService,
                SettingsStoreService,
                ScreenOrientation,
            ],
            imports: [
                RouterTestingModule.withRoutes([]),
                AuthLibModule.forRoot(config),
            ],
        }).compileComponents();
    }));

    it('should create the app', async () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    });

    it('should initialize the app', async () => {
        TestBed.createComponent(AppComponent);
        expect(platformSpy.ready).toHaveBeenCalled();
        await platformReadySpy;
        expect(statusBarSpy.styleDefault).toHaveBeenCalled();
        expect(splashScreenSpy.hide).toHaveBeenCalled();
    });

    it('should have urls', async () => {
        const fixture = await TestBed.createComponent(AppComponent);
        fixture.componentInstance.shouldShowSignOut = true;
        await fixture.detectChanges();
        const app = fixture.nativeElement;
        const menuItems = app.querySelectorAll('ion-item');
        expect(menuItems.length).toEqual(6);
    });
});
