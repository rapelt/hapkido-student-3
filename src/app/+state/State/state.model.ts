import { AuthStoreModel } from '../Authentication/auth-store.model';
import { TechniquesStoreModel } from '../Techniques/techniques-store.model';
import { SettingsStoreModel } from '../Settings/settings-store.model';
import { StudentStoreModel } from '../Student/student-store.model';
import { ClassStoreModel } from '../Classes/class-store.model';

export interface StateModel {
    authentication: AuthStoreModel;
    techniques: TechniquesStoreModel;
    settings: SettingsStoreModel;
    student: StudentStoreModel;
    classes: ClassStoreModel;
}
