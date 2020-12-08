import {Injectable} from '@angular/core';
import {ObservableStore} from '@codewithdan/observable-store';
import {AuthStatesEnum} from 'hapkido-auth-lib';
import {of} from 'rxjs';
import {SettingsStoreActions} from './settings-store.actions';
import {StateModel} from '../State/state.model';
import {SettingsStoreModel} from './settings-store.model';

@Injectable()
export class SettingsStoreService extends ObservableStore<StateModel> {

    constructor() {
        super({ trackStateHistory: true, logStateChanges: true});
    }

    setDevice(device: {
        isMobile: boolean,
        isDesktop: boolean,
        isMobileWeb: boolean,
        isTablet: boolean
    }) {
        console.log(device);
        const state = this.getState().settings;
        state.device = device;
        this.setState({
            settings: {
                ...state,
                device: state.device
            }
        }, SettingsStoreActions.SetDevice);
    }


}
