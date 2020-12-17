import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { TechniqueSetData } from '../techniques/technique-set-list/technique.selector';
import { StudentModel } from '../common/models/student.model';
import { ClassModel } from '../common/models/class.model';
import * as moment from 'moment';
import { GradingDatesModel } from '../common/models/grading-dates';

export interface StudentInformation {
    student: StudentModel;
    sortedClasses: SortedClass[];
}

export interface SortedClass {
    monthId: number;
    month: string;
    classes: ClassModel[];
}

@Injectable({
    providedIn: 'root',
})
export class AttendanceSelector {
    subscription;

    constructor(private studentStore: StudentStoreService) {}

    getStudent() {
        return this.studentStore.stateChanged.pipe(
            map(
                (state): StudentInformation => {
                    const student = state?.student?.student;
                    if (student === null || student === undefined) {
                        return null;
                    }

                    const sortedClasses = this.sortedClasses(
                        this.sort(student.attendance)
                    );

                    return { student: student, sortedClasses: sortedClasses };
                }
            )
        );
    }

    sort(array: ClassModel[]) {
        return array.sort((a, b) => {
            const a2 = moment(a.date);
            const b2 = moment(b.date);
            if (a2.isBefore(b2)) {
                return 1;
            }
            if (a2.isAfter(b2)) {
                return -1;
            }
            return 0;
        });
    }

    sortedClasses(classes: ClassModel[]): SortedClass[] {
        const classGroup: SortedClass[] = [];
        classes.map((aclass) => {
            const m = moment(aclass.date);
            const yearID = parseInt(m.format('YYMM'), 10);
            console.log(yearID);

            const groupIndex = classGroup.findIndex((group) => {
                return group.monthId === yearID;
            });

            if (groupIndex === -1) {
                classGroup.push({
                    monthId: yearID,
                    month: m.format('MMMM YYYY'),
                    classes: [aclass],
                });
            } else {
                classGroup[groupIndex].classes.push(aclass);
            }
        });

        return classGroup;
    }

    getData() {
        this.subscription = this.studentStore.get().subscribe(null);
    }

    unsubscribe() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
