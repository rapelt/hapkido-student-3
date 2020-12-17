import { Component, OnInit } from '@angular/core';
import { UpcomingClassesSelector } from './upcoming-classes.selector';
import { Observable } from 'rxjs';
import { ClassModel } from '../../common/models/class.model';

@Component({
    selector: 'app-upcoming-classes',
    templateUrl: './upcoming-classes.component.html',
    styleUrls: ['./upcoming-classes.component.scss'],
})
export class UpcomingClassesComponent implements OnInit {
    classes$: Observable<ClassModel[]>;
    deviceWidth = window.innerWidth;

    constructor(private selector: UpcomingClassesSelector) {}

    ngOnInit() {
        window.addEventListener('resize', () => {
            this.deviceWidth = window.innerWidth;
        });

        this.selector.getData();
        this.classes$ = this.selector.getClasses();
    }
}
