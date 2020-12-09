import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TechniqueListSelector } from './technique-list.selector';
import { Observable, of } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { GradeHelper } from '../../common/helpers/grade/grade';
import { filter, first, map } from 'rxjs/operators';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';

@Component({
    selector: 'app-technique-list',
    templateUrl: './technique-list.page.html',
    styleUrls: ['./technique-list.page.scss'],
})
export class TechniqueListPage implements OnInit, OnDestroy {
    subscriber;
    setId;
    setType: 'color' | 'set';
    techniques$: Observable<TechniqueModel[]>;
    title: Observable<string>;

    constructor(
        private activatedRoute: ActivatedRoute,
        private selector: TechniqueListSelector,
        private router: Router
    ) {}

    ngOnInit() {
        this.selector.getData();

        this.subscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.setType = params.get('type') as 'set' | 'color';
                this.setId = parseInt(params.get('id'), 10);
                this.getData();
                this.getTitle();
            }
        );
    }

    getData() {
        this.techniques$ = this.selector.getTechniques(
            this.setType,
            this.setId
        );
    }

    getTitle() {
        if (this.setType === 'color') {
            this.title = of(GradeHelper.getLongDisplayName(this.setId));
        }

        if (this.setType === 'set') {
            this.title = this.techniques$.pipe(
                filter((tech, index) => {
                    return tech !== null;
                }),
                map((tech) => {
                    return tech[0].techniqueSet.name;
                })
            );
        }
    }

    goToTechnique(id) {
        this.selector.setPlaylist();
        this.router.navigate(['/technique/' + id]);
    }

    ngOnDestroy() {
        this.subscriber.unsubscribe();
        this.selector.unsubscribe();
    }
}
