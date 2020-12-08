import {Injectable} from '@angular/core';
import {StateModel} from './state.model';
import {ObservableStore} from '@codewithdan/observable-store';
import {StateStoreActions} from './state-store.actions';
import {getInitialState} from './initial-state';
import {AuthStoreActions} from '../Authentication/auth-store.actions';

@Injectable()
export class StateStoreService extends ObservableStore<StateModel> {

    constructor() {
        super({ trackStateHistory: true, logStateChanges: true});

        this.setState( getInitialState(), StateStoreActions.InitializeState);
    }

    resetState(): StateModel {
        const state: StateModel = this.getState();
        this.setState(getInitialState(), StateStoreActions.resetState);
        return state;
    }
}
