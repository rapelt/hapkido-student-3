import { Component, OnInit } from '@angular/core';
import { AttendanceSelector, StudentInformation } from './attendance.selector';
import { Observable } from 'rxjs';
import { StudentModel } from '../common/models/student.model';
import { ClassModel } from '../common/models/class.model';

@Component({
    selector: 'app-attendance',
    templateUrl: './attendance.page.html',
    styleUrls: ['./attendance.page.scss'],
})
export class AttendancePage implements OnInit {
    studentInformation$: Observable<StudentInformation>;

    constructor(private selector: AttendanceSelector) {}

    ngOnInit() {
        this.selector.getData();
        this.studentInformation$ = this.selector.getStudent();
    }
}
