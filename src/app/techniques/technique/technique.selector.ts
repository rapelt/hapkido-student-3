import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { MediaModel } from '../../common/models/media';
import { SettingsStoreService } from '../../+state/Settings/settings-store.service';
import { DeviceModel } from '../../common/models/device.model';

export interface TechniqueData {
    technique: TechniqueModel;
    media: {
        videos: MediaModel[];
        photos: MediaModel[];
        documents: MediaModel[];
        other: MediaModel[];
        playlist: TechniqueModel[];
    };
    backLink: string;
}

@Injectable({
    providedIn: 'root',
})
export class TechniqueSelector {
    subscription;

    constructor(
        private techniquesStoreService: TechniqueStoreService,
        private settingStoreService: SettingsStoreService
    ) {}

    getTechnique(id: number): Observable<TechniqueData | null> {
        return this.techniquesStoreService.stateChanged.pipe(
            map(
                (state): TechniqueData => {
                    const techniques = state?.techniques?.techniques;
                    if (techniques === null || techniques === undefined) {
                        return null;
                    }

                    const technique = techniques.find((tech) => {
                        return tech.id === id;
                    });

                    let playlist = [];

                    if (state.techniques.playlist) {
                        playlist = techniques.filter((t) => {
                            return (
                                state.techniques.playlist.includes(t.id) &&
                                t.id !== id
                            );
                        });
                    } else {
                        playlist = techniques.filter((t) => {
                            return t.grade === technique.grade && t.id !== id;
                        });
                    }

                    return {
                        technique: technique,
                        media: {
                            videos: technique.media.filter((media) => {
                                return media.folder.includes('videos');
                            }),
                            photos: technique.media.filter((media) => {
                                return media.folder.includes('photos');
                            }),
                            documents: technique.media.filter((media) => {
                                return media.folder.includes('documents');
                            }),
                            other: technique.media.filter((media) => {
                                return media.folder.includes('other');
                            }),
                            playlist: playlist,
                        },
                        backLink: state.techniques.techniqueFilter,
                    };
                }
            )
        );
    }

    getDevice(): Observable<DeviceModel | null> {
        return this.settingStoreService.stateChanged.pipe(
            map(
                (state): DeviceModel => {
                    return state?.settings?.device;
                }
            )
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
