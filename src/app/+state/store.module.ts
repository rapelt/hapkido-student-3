import { NgModule } from '@angular/core';
import { AuthStoreService } from './Authentication/auth-store.service';
import { TechniquesHttp } from './Techniques/techniques.http';
import { TechniqueStoreService } from './Techniques/technique-store.service';
import { StateStoreService } from './State/state-store.service';
import { SettingsStoreService } from './Settings/settings-store.service';
import { StudentStoreService } from './Student/student-store.service';
import { ClassStoreService } from './Classes/class-store.service';

@NgModule({
    providers: [
        AuthStoreService,
        TechniquesHttp,
        TechniqueStoreService,
        StateStoreService,
        SettingsStoreService,
        StudentStoreService,
        ClassStoreService,
    ],
})
export class StoreModule {}
