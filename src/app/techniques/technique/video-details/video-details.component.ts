import { Component, Input, OnInit } from '@angular/core';
import { TechniqueModel } from '../../../common/models/technique';
import { VideoDetailsSelector } from './video-details.selector';

@Component({
    selector: 'app-video-details',
    templateUrl: './video-details.component.html',
    styleUrls: ['./video-details.component.scss'],
})
export class VideoDetailsComponent implements OnInit {
    @Input()
    technique: TechniqueModel;

    constructor(private selector: VideoDetailsSelector) {}

    ngOnInit() {}

    getViews() {
        let views = 0;

        this.technique.media.map((m) => {
            views = views + m.views;
        });

        return views;
    }

    learnTechnique(techniqueId) {
        this.technique.isUnwatched = false;
        this.selector.setLearnt(techniqueId);
    }

    unlearnTechnique(techniqueId) {
        this.technique.isUnwatched = true;
        this.selector.setUnLearnt(techniqueId);
    }

    addFavourite(techniqueId) {
        this.technique.isFavourite = true;
        this.selector.setFavourite(techniqueId);
    }

    removeFavourite(techniqueId) {
        this.technique.isFavourite = false;
        this.selector.removeFavourite(techniqueId);
    }
}
