import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';

@Injectable({
    providedIn: 'root',
})
export class VideoDetailsSelector {
    subscription;

    constructor(private techniquesStoreService: TechniqueStoreService) {}
    setUnLearnt(techniqueID) {
        this.techniquesStoreService.setUnlearnTechnique(techniqueID);
    }
    setLearnt(techniqueID) {
        this.techniquesStoreService.setLearnTechnique(techniqueID);
    }

    setFavourite(techniqueID) {
        this.techniquesStoreService.setFavourite(techniqueID);
    }
    removeFavourite(techniqueID) {
        this.techniquesStoreService.removeFavourite(techniqueID);
    }
}
