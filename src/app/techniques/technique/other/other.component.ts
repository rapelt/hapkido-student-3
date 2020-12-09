import { Component, Input, OnInit } from '@angular/core';
import { TechniqueModel } from '../../../common/models/technique';

@Component({
    selector: 'app-other',
    templateUrl: './other.component.html',
    styleUrls: ['./other.component.scss'],
})
export class OtherComponent implements OnInit {
    @Input()
    technique: TechniqueModel;

    @Input()
    media;

    constructor() {}

    ngOnInit() {}
}
