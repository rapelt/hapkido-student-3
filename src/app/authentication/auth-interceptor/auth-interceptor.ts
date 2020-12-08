import {
    HttpEvent,
    HttpHandler,
    HttpInterceptor,
    HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthStatesEnum } from 'hapkido-auth-lib';
import {AuthStoreService} from '../../+state/Authentication/auth-store.service';
import {AuthStoreModel} from '../../+state/Authentication/auth-store.model';

/*
  Generated class for the AuthInterceptorProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    accessToken = null;

    constructor(private authStoreService: AuthStoreService) {
        this.authStoreService.stateChanged.subscribe((data) => {
            const ndata = data.authentication;
            console.log(
                'Auth Interceptor - Authentication State Changed ' +
                ndata.authenticationState
            );

            if (ndata.authenticationState === AuthStatesEnum.LoggedIn) {
                if (
                    !ndata ||
                    !ndata.user ||
                    ndata.user.signInUserSession === undefined
                ) {
                    console.log(
                        'Auth Interceptor - Empty Access Token because user session is undefined'
                    );

                    this.accessToken = '';
                } else {
                    console.log('Auth Interceptor - With access token');

                    this.accessToken =
                        ndata.user.signInUserSession.accessToken.jwtToken;
                }
            }
        });
    }

    intercept(
        req: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                Authorization: `Bearer ${this.accessToken}`
            },
        });

        return next.handle(req);
    }
}
