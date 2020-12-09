import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TechniqueSelector, TechniqueSetData } from './technique.selector';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-techniques',
    templateUrl: './techniques.page.html',
    styleUrls: ['./techniques.page.scss'],
})
export class TechniquesPage implements OnInit, OnDestroy {
    techniques$: Observable<TechniqueSetData[]>;
    segment: 'set' | 'color' = 'set';

    constructor(
        private selector: TechniqueSelector,
        private techniqueStore: TechniqueStoreService,
        private router: Router
    ) {}

    ngOnInit() {
        this.selector.getData();
        this.techniques$ = this.selector.getAllTechniqueSets(this.segment);
    }

    progress(value: TechniqueSetData) {
        return (
            1 -
            value.numberOfUnwatchedTechniques /
                value.numberOfAvailableTechniques
        );
    }

    progressNumbers(tech: TechniqueSetData): string {
        return `${
            tech.numberOfAvailableTechniques - tech.numberOfUnwatchedTechniques
        }/${tech.numberOfAvailableTechniques}`;
    }

    isLocked(tech) {
        return tech.numberOfAvailableTechniques === 0;
    }

    segmentChanged(event) {
        this.segment = event.detail.value;
        this.techniques$ = this.selector.getAllTechniqueSets(this.segment);
    }

    numberOfUnavailableTechniques(tech) {
        return tech.numberOfTechniques - tech.numberOfAvailableTechniques;
    }

    ngOnDestroy() {
        this.selector.unsubscribe();
    }

    goToTechniques(tech: TechniqueSetData) {
        this.selector.setTechniqueFilter(
            this.segment + '/' + tech.techniqueSetId
        );
        this.router.navigate([
            '/technique/list/' + this.segment + '/' + tech.techniqueSetId,
        ]);
    }
}
