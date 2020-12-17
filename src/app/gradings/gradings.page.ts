import { Component, OnInit } from '@angular/core';
import { GradingsSelector, SortedGradings } from './gradings.selector';
import { Observable } from 'rxjs';
import { StudentModel } from '../common/models/student.model';
import { GradeHelper } from '../common/helpers/grade/grade';

@Component({
    selector: 'app-gradings',
    templateUrl: './gradings.page.html',
    styleUrls: ['./gradings.page.scss'],
})
export class GradingsPage implements OnInit {
    gradeHelper;
    sortedGradings$: Observable<SortedGradings[]>;

    constructor(private selector: GradingsSelector) {
        this.gradeHelper = GradeHelper;
    }

    ngOnInit() {
        this.selector.getData();
        this.sortedGradings$ = this.selector.getSortedGradings();
    }
}
