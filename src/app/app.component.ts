import { Component, OnInit } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import {
    AuthenticationServices,
    AuthStatesEnum,
    AuthStateService,
} from 'hapkido-auth-lib';
import { AuthStoreService } from './+state/Authentication/auth-store.service';
import { StateStoreService } from './+state/State/state-store.service';
import { SettingsStoreService } from './+state/Settings/settings-store.service';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Router } from '@angular/router';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
    public selectedIndex = 0;
    shouldShowSignOut = false;
    storeSub;
    userEmail: string;
    public appPages = [
        {
            title: 'Home',
            url: '/home',
            icon: 'home',
        },
        {
            title: 'Attendance',
            url: '/attendance',
            icon: 'calendar',
        },
        {
            title: 'Grades',
            url: '/grades',
            icon: 'bookmark',
        },
        {
            title: 'Profile',
            url: '/profile',
            icon: 'person',
        },
        {
            title: 'Techniques',
            url: '/technique',
            icon: 'videocam',
        },
    ];

    buttonConfig = {
        lines: 'none',
        detail: false,
        routerDirection: 'root',
        iconColor: 'medium',
    };

    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private authState: AuthStateService,
        private authService: AuthenticationServices,
        private authStoreService: AuthStoreService,
        private stateStoreService: StateStoreService,
        private settingStoreService: SettingsStoreService,
        private screenOrientation: ScreenOrientation,
        private router: Router
    ) {
        this.initializeApp();
    }

    locked;

    initializeApp() {
        this.platform.ready().then(() => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.settingStoreService.setDevice({
                isDesktop: this.platform.is('desktop'),
                isMobile: this.platform.is('mobile'),
                isMobileWeb: this.platform.is('mobileweb'),
                isTablet: this.platform.is('tablet'),
            });

            if (this.platform.is('mobile') || this.platform.is('mobileweb')) {
                this.screenOrientation.lock('portrait').then(
                    (locked) => {
                        this.locked = 'locked' + locked.toString();
                    },
                    (error) => {
                        this.locked = 'Error ' + error.toString();
                    }
                );
            }
        });
    }

    ngOnInit() {
        const path = window.location.pathname.split('folder/')[1];
        if (path !== undefined) {
            this.selectedIndex = this.appPages.findIndex(
                (page) => page.title.toLowerCase() === path.toLowerCase()
            );
        }

        this.authService.load().then(() => {
            this.shouldShowSignOut =
                this.authState.isLoggedIn === AuthStatesEnum.LoggedIn;
            console.log(
                'App Component - is logged in ' + this.shouldShowSignOut
            );

            if (this.shouldShowSignOut) {
                this.loggedIn(this.authState.isLoggedIn);
            }

            this.authState._userAttributesEvent
                .pipe()
                .subscribe((attributes) => {
                    this.authStoreService.setAttributes(attributes);
                    this.email();
                });

            this.authState._isLoggedInEvent.pipe().subscribe((isLoggedIn) => {
                if (isLoggedIn === AuthStatesEnum.LoggedIn) {
                    this.loggedIn(isLoggedIn);
                }

                if (isLoggedIn === AuthStatesEnum.Loggedout) {
                    this.loggedOut();
                }
            });
        });
    }

    loggedIn(isLoggedIn) {
        this.shouldShowSignOut = isLoggedIn === AuthStatesEnum.LoggedIn;
        if (!this.shouldShowSignOut) {
            return;
        }

        if (this.authState.cognitoUser) {
            const user = {
                username: this.authState.cognitoUser.getUsername(),
                signInUserSession: this.authState.cognitoUser
                    .getSignInUserSession
                    ? this.authState.cognitoUser.getSignInUserSession()
                    : { accessToken: { jwtToken: null } },
            };
            this.authStoreService.signIn(user, AuthStatesEnum.LoggedIn);
        }

        if (this.authState.userAttributes) {
            this.authStoreService.setAttributes(this.authState.userAttributes);
        }

        console.log('Sign in is at url: ', this.router.url);
        if (this.router.url === '/authentication/sign-in') {
            console.log('Navigating to home: ', '/home');
            this.router.navigateByUrl('/home');
        }
    }

    loggedOut() {
        this.shouldShowSignOut = false;
        this.stateStoreService.resetState();
    }

    email() {
        this.storeSub = this.authStoreService.stateChanged.subscribe(
            (state) => {
                if (state && state.authentication.userAttributes.length > 0) {
                    this.userEmail = state.authentication.userAttributes.find(
                        (att) => att.Name === 'email'
                    ).Value;
                }
            }
        );
    }
}
