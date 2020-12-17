import { Component, OnInit } from '@angular/core';
import { RecommendedViewingSelector } from './recommended-viewing.selector';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { GradeHelper } from '../../common/helpers/grade/grade';
import { filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
    selector: 'app-recommended-viewing',
    templateUrl: './recommended-viewing.component.html',
    styleUrls: ['./recommended-viewing.component.scss'],
})
export class RecommendedViewingComponent implements OnInit {
    techniques$: Observable<TechniqueModel[]>;

    constructor(
        private selector: RecommendedViewingSelector,
        private router: Router
    ) {}

    ngOnInit() {
        this.selector.getData();
        this.techniques$ = this.selector.getTechniques();
    }

    getSrc(technique: TechniqueModel) {
        const video = technique.media.findIndex((m) => {
            return m.folder.includes('video');
        });

        if (video === -1) {
            return '../../../assets/shapes.svg';
        }

        return (
            technique.media[video].url +
            'Thumbnails/' +
            technique.media[video].file_name +
            '.0000001.jpg'
        );
    }

    goToTechnique(id) {
        this.router.navigate(['/technique/' + id]);
    }
}
