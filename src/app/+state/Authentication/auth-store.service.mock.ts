import { of } from 'rxjs';
import { getInitialState } from '../State/initial-state';
import { AuthStatesEnum } from 'hapkido-auth-lib';

export class AuthStoreServiceMock {
    stateChanged = of(this.getState());

    private getState() {
        const initState = getInitialState();
        initState.authentication = {
            user: {
                username: 'string',
                signInUserSession: 'any',
            },
            authenticationState: AuthStatesEnum.LoggedIn,
            userAttributes: [],
            username: 'string',
            session: 'any',
        };
        return initState;
    }
}
