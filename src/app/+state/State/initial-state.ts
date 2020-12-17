import { StateModel } from './state.model';
import { AuthStatesEnum } from 'hapkido-auth-lib';

export function getInitialState(): StateModel {
    return {
        techniques: null,
        authentication: {
            user: {
                username: '',
                signInUserSession: {},
            },
            authenticationState: AuthStatesEnum.Loggedout,
            userAttributes: [],
            username: '',
            session: {},
        },
        classes: null,
        student: null,
        settings: {
            device: {
                isMobile: true,
                isDesktop: false,
                isMobileWeb: false,
                isTablet: false,
            },
        },
    };
}
