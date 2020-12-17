import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { MediaModel } from '../../common/models/media';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { DeviceModel } from '../../common/models/device.model';

@Injectable({
    providedIn: 'root',
})
export class RecommendedViewingSelector {
    subscription;

    constructor(
        private techniquesStoreService: TechniqueStoreService,
        private settingStoreService: SettingsStoreService
    ) {}

    getTechniques(): Observable<TechniqueModel[] | null> {
        return this.techniquesStoreService.stateChanged.pipe(
            map((state): TechniqueModel[] => {
                if (state && state.techniques && state.techniques.techniques) {
                    let playlist = state.techniques.techniques.filter((t) => {
                        return t.isUnwatched;
                    });

                    if (playlist.length === 0) {
                        playlist = state.techniques.techniques.filter((t) => {
                            return t.isFavourite;
                        });
                    }

                    if (playlist.length === 0) {
                        playlist = state.techniques.techniques.filter(
                            (t, index) => {
                                return index < 10;
                            }
                        );
                    }

                    return playlist;
                } else {
                    return null;
                }
            })
        );
    }

    getData() {
        this.subscription = this.techniquesStoreService.get().subscribe(null);
    }

    unsubscribe() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
        this.subscription = null;
    }
}
