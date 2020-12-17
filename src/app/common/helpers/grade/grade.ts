import { GradeModel } from '../../models/grade.model';
import { Injectable } from '@angular/core';
import { GradingDatesModel } from '../../models/grading-dates';

@Injectable()
export class GradeHelper {
    private static grades: GradeModel[] = [
        {
            id: 0,
            shortName: 'Wh',
            longName: 'White',
            cssClass: 'white',
        },
        {
            id: 1,
            shortName: 'Y1',
            longName: 'Yellow 1',
            cssClass: 'yellow',
        },
        {
            id: 2,
            shortName: 'Y2',
            longName: 'Yellow 2',
            cssClass: 'yellow',
        },
        {
            id: 3,
            shortName: 'Y3',
            longName: 'Yellow 3',
            cssClass: 'yellow',
        },
        {
            id: 4,
            shortName: 'B1',
            longName: 'Blue 1',
            cssClass: 'blue',
        },
        {
            id: 5,
            shortName: 'B2',
            longName: 'Blue 2',
            cssClass: 'blue',
        },
        {
            id: 6,
            shortName: 'B3',
            longName: 'Blue 3',
            cssClass: 'blue',
        },
        {
            id: 7,
            shortName: 'R1',
            longName: 'Red 1',
            cssClass: 'red',
        },
        {
            id: 8,
            shortName: 'R2',
            longName: 'Red 2',
            cssClass: 'red',
        },
        {
            id: 9,
            shortName: 'R3',
            longName: 'Red 3',
            cssClass: 'red',
        },
        {
            id: 10,
            shortName: '1D',
            longName: '1st Dan',
            cssClass: 'black',
        },
        {
            id: 11,
            shortName: '2D',
            longName: '2nd Dan',
            cssClass: 'black',
        },
        {
            id: 12,
            shortName: '3D',
            longName: '3rd Dan',
            cssClass: 'black',
        },
        {
            id: 13,
            shortName: '4D',
            longName: '4th Dan',
            cssClass: 'black',
        },
        {
            id: 14,
            shortName: '5D',
            longName: '5th Dan',
            cssClass: 'black',
        },
        {
            id: 15,
            shortName: '6D',
            longName: '6th Dan',
            cssClass: 'black',
        },
        {
            id: 16,
            shortName: '7D',
            longName: '7th Dan',
            cssClass: 'black',
        },
        {
            id: 17,
            shortName: '8D',
            longName: '8th Dan',
            cssClass: 'black',
        },
        {
            id: 18,
            shortName: '9D',
            longName: '9th Dan',
            cssClass: 'black',
        },
    ];

    constructor() {}

    static getShortDisplayName(id) {
        return GradeHelper.grades[id].shortName;
    }

    static getLongDisplayName(id) {
        return GradeHelper.grades[id].longName;
    }

    static getAllGrades() {
        return GradeHelper.grades;
    }

    static getCssClass(id) {
        return GradeHelper.grades[id].cssClass;
    }

    static sort(array: GradingDatesModel[]): GradingDatesModel[] {
        return array.sort((a, b) => {
            if (a.grade < b.grade) {
                return 1;
            }
            if (a.grade > b.grade) {
                return -1;
            }
            return 0;
        });
    }
}
