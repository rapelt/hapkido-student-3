import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {
    AttendanceSelector,
    StudentInformation,
} from '../attendance/attendance.selector';
import { StudentModel } from '../common/models/student.model';
import { ProfileSelector } from './profile.selector';
import { AuthStoreModel } from '../+state/Authentication/auth-store.model';
import { CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.page.html',
    styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
    student$: Observable<StudentModel>;
    auth$: Observable<AuthStoreModel>;

    constructor(private selector: ProfileSelector, private router: Router) {}

    ngOnInit() {
        this.selector.getData();
        this.student$ = this.selector.getStudent();
        this.auth$ = this.selector.getAuth();
    }

    userEmailVerified(userAttributes: CognitoUserAttribute[]) {
        if (userAttributes.length > 0) {
            const attri = userAttributes;

            const email = attri.find((att) => att.Name === 'email');
            const emailVerifiedAttri = attri.find(
                (att) => att.Name === 'email_verified'
            );

            const emailVerified = emailVerifiedAttri
                ? emailVerifiedAttri.Value
                : 'false';

            return {
                email: email.Value,
                emailVerified: emailVerified,
            };
        }

        return null;
    }

    sendCode() {
        this.router.navigateByUrl('authentication/verify-email');
    }

    verifyEmailSubmit() {
        // this.store.dispatch(
        //     new VerifyEmail(this.verifyEmailForm.get('code').value)
        // );
    }
}
