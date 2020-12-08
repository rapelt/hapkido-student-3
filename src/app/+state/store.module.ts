import { NgModule } from '@angular/core';
import {AuthStoreService} from './Authentication/auth-store.service';
import {TechniquesHttp} from './Techniques/techniques.http';
import {TechniqueStoreService} from './Techniques/technique-store.service';
import {StateStoreService} from './State/state-store.service';
import {SettingsStoreService} from './Settings/settings-store.service';

@NgModule({
    providers: [AuthStoreService, TechniquesHttp, TechniqueStoreService, StateStoreService, SettingsStoreService],
})
export class StoreModule {}
