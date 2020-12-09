import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';

@Injectable({
    providedIn: 'root',
})
export class VideoSelector {
    subscription;

    constructor(private techniquesStoreService: TechniqueStoreService) {}
    addView(mediaId) {
        this.techniquesStoreService.updateViews(mediaId);
    }
}
