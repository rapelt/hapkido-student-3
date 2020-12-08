import {CognitoUser} from 'amazon-cognito-identity-js';
import {AuthStatesEnum} from 'hapkido-auth-lib';

export interface AuthStoreModel {
    user: {
        username: string,
        signInUserSession: any
    };
    authenticationState: AuthStatesEnum;
    userAttributes: any[];
    username: string;
    session: any;
}
