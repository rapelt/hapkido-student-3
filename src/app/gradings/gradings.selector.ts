import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { ClassModel } from '../common/models/class.model';
import * as moment from 'moment';
import { StudentModel } from '../common/models/student.model';
import { GradingDatesModel } from '../common/models/grading-dates';
import { SortedClass } from '../attendance/attendance.selector';
import { GradeHelper } from '../common/helpers/grade/grade';

export interface SortedGradings {
    year: number;
    gradings: GradingDatesModel[];
}

@Injectable({
    providedIn: 'root',
})
export class GradingsSelector {
    subscription;

    constructor(private studentStore: StudentStoreService) {}

    getSortedGradings() {
        return this.studentStore.stateChanged.pipe(
            map((state): SortedGradings[] => {
                const student = state?.student?.student;
                if (student === null || student === undefined) {
                    return null;
                }

                return this.sortedGradings(
                    GradeHelper.sort(student.gradingDates)
                );
            })
        );
    }

    sortedGradings(gradings: GradingDatesModel[]): SortedGradings[] {
        const gradingGroups: SortedGradings[] = [];
        gradings.map((agrade) => {
            const m = moment(agrade.date);
            const yearID: number = m.year();
            console.log(yearID);

            const groupIndex = gradingGroups.findIndex((group) => {
                return group.year === yearID;
            });

            if (groupIndex === -1) {
                gradingGroups.push({
                    year: yearID,
                    gradings: [agrade],
                });
            } else {
                gradingGroups[groupIndex].gradings.push(agrade);
            }
        });

        return gradingGroups;
    }

    getData() {
        this.subscription = this.studentStore.get().subscribe(null);
    }

    unsubscribe() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
