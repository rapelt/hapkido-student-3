import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {AuthStatesEnum} from 'hapkido-auth-lib';
import {of} from 'rxjs';
import {AuthStoreActions} from './auth-store.actions';
import {StateModel} from '../State/state.model';
import {AuthStoreModel} from './auth-store.model';

@Injectable()
export class AuthStoreService extends ObservableStore<StateModel> {

    constructor() {
        super({ trackStateHistory: true, logStateChanges: true});

        const initialState: AuthStoreModel = {
            user: {
                username: 'string',
                signInUserSession: {}
            },
            authenticationState: AuthStatesEnum.Loggedout,
            userAttributes: [],
            username: '',
            session: {},
        };

        this.setState( { authentication: initialState}, AuthStoreActions.InitializeState);
    }

    get() {
        const auth = this.getState().authentication;
        if (auth) {
            return of(auth);
        }
    }

    signIn(user: { username: string, signInUserSession: any}, authState: AuthStatesEnum) {
        const state = this.getState().authentication;
        state.user = user;
        state.authenticationState = authState;
        this.setState({
                authentication: {
                    ...state,
                    user: state.user,
                    authenticationState: state.authenticationState
                }
            }, AuthStoreActions.SignIn);
    }

    signOut() {
    }

    setAttributes(userAttributes: any) {
        const state = this.getState().authentication;
        state.userAttributes = userAttributes;
        this.setState({
            authentication: {
                ...state,
                userAttributes: state.userAttributes
            }
        }, AuthStoreActions.SetAttributes);
    }


}
