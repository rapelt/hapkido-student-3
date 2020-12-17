import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { StudentStoreService } from '../+state/Student/student-store.service';
import { ClassModel } from '../common/models/class.model';
import * as moment from 'moment';
import { StudentModel } from '../common/models/student.model';
import { GradeHelper } from '../common/helpers/grade/grade';
import { AuthStoreService } from '../+state/Authentication/auth-store.service';
import { AuthStoreModel } from '../+state/Authentication/auth-store.model';

@Injectable({
    providedIn: 'root',
})
export class ProfileSelector {
    subscription;

    constructor(
        private studentStore: StudentStoreService,
        private authStore: AuthStoreService
    ) {}

    getStudent() {
        return this.studentStore.stateChanged.pipe(
            map(
                (state): StudentModel => {
                    const student = state?.student?.student;
                    if (student === null || student === undefined) {
                        return null;
                    }

                    student.gradingDates = GradeHelper.sort(
                        student.gradingDates
                    );

                    return student;
                }
            )
        );
    }

    getAuth() {
        return this.authStore.stateChanged.pipe(
            map(
                (state): AuthStoreModel => {
                    const auth = state?.authentication;
                    if (auth === null || auth === undefined) {
                        return null;
                    }

                    return auth;
                }
            )
        );
    }

    getData() {
        this.subscription = this.studentStore.get().subscribe(null);
    }

    unsubscribe() {
        this.subscription.unsubscribe();
        this.subscription = null;
    }
}
