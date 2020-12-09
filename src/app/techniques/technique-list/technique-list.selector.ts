import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { GradeHelper } from '../../common/helpers/grade/grade';

@Injectable({
    providedIn: 'root',
})
export class TechniqueListSelector {
    subscription;
    sortedData: TechniqueModel[];

    constructor(private techniquesStoreService: TechniqueStoreService) {}

    getTechniques(
        type: 'set' | 'color',
        id: number
    ): Observable<TechniqueModel[] | null> {
        return this.techniquesStoreService.stateChanged.pipe(
            map((state): TechniqueModel[] => {
                const techniques = state?.techniques?.techniques;
                if (techniques === null || techniques === undefined) {
                    return null;
                }

                let sortedData: TechniqueModel[] = [];

                if (type === 'set') {
                    sortedData = this.sortBySet(id, techniques);
                }

                if (type === 'color') {
                    sortedData = this.sortByColor(id, techniques);
                }
                this.sortedData = sortedData;

                return sortedData;
            })
        );
    }

    sortBySet(set: number, techniques: TechniqueModel[]): TechniqueModel[] {
        return techniques.filter((technique) => {
            return technique.techniqueSet.id === set;
        });
    }

    sortByColor(set: number, techniques: TechniqueModel[]): TechniqueModel[] {
        return techniques.filter((technique) => {
            return technique.grade === set;
        });
    }

    getData() {
        this.subscription = this.techniquesStoreService.get().subscribe(null);
    }

    setPlaylist() {
        const ids = this.sortedData.map((t) => {
            return t.id;
        });
        this.techniquesStoreService.setPlaylist(ids);
    }

    unsubscribe() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
