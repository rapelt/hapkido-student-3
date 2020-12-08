import {AuthStoreModel} from '../Authentication/auth-store.model';
import {TechniquesStoreModel} from '../Techniques/techniques-store.model';
import {SettingsStoreModel} from '../Settings/settings-store.model';

export interface StateModel {
    authentication: AuthStoreModel;
    techniques: TechniquesStoreModel;
    settings: SettingsStoreModel;
}
