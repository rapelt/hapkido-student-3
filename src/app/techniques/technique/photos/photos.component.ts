import { Component, Input, OnInit } from '@angular/core';
import { MediaModel } from '../../../common/models/media';

@Component({
    selector: 'app-photos',
    templateUrl: './photos.component.html',
    styleUrls: ['./photos.component.scss'],
})
export class PhotosComponent implements OnInit {
    @Input()
    photos: MediaModel[];

    constructor() {}

    ngOnInit() {}
}
