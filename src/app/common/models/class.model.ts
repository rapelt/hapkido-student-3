import { Moment } from 'moment';

export interface ClassModel {
    classId: string;
    classType: string;
    date: Moment;
    isGrading: boolean;
}
