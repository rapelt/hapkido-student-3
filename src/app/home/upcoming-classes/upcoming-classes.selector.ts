import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { ClassStoreService } from '../../+state/Classes/class-store.service';
import { ClassModel } from '../../common/models/class.model';
import * as moment from 'moment';

@Injectable({
    providedIn: 'root',
})
export class UpcomingClassesSelector {
    subscription;

    constructor(private classStore: ClassStoreService) {}

    getClasses(): Observable<ClassModel[] | null> {
        return this.classStore.stateChanged.pipe(
            map((state): ClassModel[] => {
                if (state && state.classes && state.classes.nextWeeksClasses) {
                    return this.sort(state.classes.nextWeeksClasses);
                } else {
                    return null;
                }
            })
        );
    }

    sort(array: ClassModel[]) {
        return array.sort((a, b) => {
            const a2 = moment(a.date);
            const b2 = moment(b.date);
            if (a2.isBefore(b2)) {
                return -1;
            }
            if (a2.isAfter(b2)) {
                return 1;
            }
            return 0;
        });
    }

    getData() {
        this.subscription = this.classStore.get().subscribe(null);
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = null;
    }
}
