import { classType } from './class-types';
import { NameModel } from './name';
import { GradingDatesModel } from './grading-dates';
import { paymentType } from './payment-types';
import { ClassModel } from './class.model';

export interface StudentModel {
    name: NameModel;
    hbId: string;
    email: string;
    grade: number;
    isAdmin: boolean;
    gradingDates?: GradingDatesModel[];
    isActive: boolean;
    preferredClass: classType;
    familyId?: number;
    paymentType?: paymentType;
    attendance: ClassModel[];
}
