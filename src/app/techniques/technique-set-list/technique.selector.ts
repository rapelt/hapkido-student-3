import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../+state/Techniques/technique-store.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { GradeHelper } from '../../common/helpers/grade/grade';

export interface TechniqueSetData {
    techniqueSetId: number;
    techniqueSetTitle: string;
    numberOfTechniques: number;
    numberOfUnwatchedTechniques: number;
    numberOfAvailableTechniques: number;
    lowestGrade: number;
    highestGrade: number;
}

@Injectable({
    providedIn: 'root',
})
export class TechniqueSelector {
    subscription;

    constructor(private techniquesStoreService: TechniqueStoreService) {}

    getAllTechniqueSets(
        type: 'set' | 'color'
    ): Observable<TechniqueSetData[] | null> {
        return this.techniquesStoreService.stateChanged.pipe(
            map((state): TechniqueSetData[] => {
                const techniques = state?.techniques?.techniques;
                if (techniques === null || techniques === undefined) {
                    return null;
                }

                let sortedData: TechniqueSetData[] = [];

                if (type === 'set') {
                    sortedData = this.sortBySet(techniques);
                }

                if (type === 'color') {
                    sortedData = this.sortByColor(techniques);
                }

                return sortedData;
            })
        );
    }

    sortBySet(techniques) {
        const techniqueSets: TechniqueSetData[] = [];

        techniques.map((t: TechniqueModel) => {
            const exists = techniqueSets.findIndex(
                (ts: TechniqueSetData) =>
                    ts.techniqueSetId === t.techniqueSet.id
            );

            if (exists > -1) {
                const ts = techniqueSets[exists];
                techniqueSets[exists] = {
                    ...ts,
                    numberOfTechniques: ts.numberOfTechniques + 1,
                    numberOfUnwatchedTechniques: t.isUnwatched
                        ? ts.numberOfUnwatchedTechniques + 1
                        : ts.numberOfUnwatchedTechniques,
                    numberOfAvailableTechniques: t.isAvailable
                        ? ts.numberOfAvailableTechniques + 1
                        : ts.numberOfAvailableTechniques,
                    lowestGrade:
                        t.grade > ts.lowestGrade ? ts.lowestGrade : t.grade,
                    highestGrade:
                        t.grade < ts.lowestGrade ? ts.lowestGrade : t.grade,
                };
                return;
            }

            techniqueSets.push({
                techniqueSetId: t.techniqueSet.id,
                techniqueSetTitle: t.techniqueSet.name,
                numberOfTechniques: 1,
                numberOfUnwatchedTechniques: t.isUnwatched ? 1 : 0,
                numberOfAvailableTechniques: t.isAvailable ? 1 : 0,
                lowestGrade: t.grade,
                highestGrade: t.grade,
            });

            return;
        });

        return this.sortTechniqueSetData(techniqueSets);
    }

    sortByColor(techniques: TechniqueModel[]) {
        const techniqueSets: TechniqueSetData[] = [];

        techniques.map((t: TechniqueModel) => {
            const exists = techniqueSets.findIndex(
                (ts: TechniqueSetData) => ts.techniqueSetId === t.grade
            );

            if (exists > -1) {
                const ts = techniqueSets[exists];
                techniqueSets[exists] = {
                    ...ts,
                    numberOfTechniques: ts.numberOfTechniques + 1,
                    numberOfUnwatchedTechniques: t.isUnwatched
                        ? ts.numberOfUnwatchedTechniques + 1
                        : ts.numberOfUnwatchedTechniques,
                    numberOfAvailableTechniques: t.isAvailable
                        ? ts.numberOfAvailableTechniques + 1
                        : ts.numberOfAvailableTechniques,
                };
                return;
            }

            techniqueSets.push({
                techniqueSetId: t.grade,
                techniqueSetTitle: GradeHelper.getLongDisplayName(t.grade),
                numberOfTechniques: 1,
                numberOfUnwatchedTechniques: t.isUnwatched ? 1 : 0,
                numberOfAvailableTechniques: t.isAvailable ? 1 : 0,
                lowestGrade: t.grade,
                highestGrade: t.grade,
            });

            return;
        });

        return this.sortTechniqueSetData(techniqueSets);
    }

    sortTechniqueSetData(
        techniqueSets: TechniqueSetData[]
    ): TechniqueSetData[] {
        return techniqueSets.sort((a, b) => {
            if (a.lowestGrade < b.lowestGrade) {
                return -1;
            }
            if (a.lowestGrade > b.lowestGrade) {
                return 1;
            }
            return 0;
        });
    }

    setTechniqueFilter(filter: string) {
        this.techniquesStoreService.setTechniqueFilter(filter);
    }

    getData() {
        this.subscription = this.techniquesStoreService.get().subscribe(null);
    }

    unsubscribe() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
