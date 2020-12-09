import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TechniqueData, TechniqueSelector } from './technique.selector';
import { DeviceModel } from '../../common/models/device.model';

@Component({
    selector: 'app-technique',
    templateUrl: './technique.page.html',
    styleUrls: ['./technique.page.scss'],
})
export class TechniquePage implements OnInit, OnDestroy {
    subscriber;
    sub;
    id: number;
    videoIndex = 0;
    technique: TechniqueData;
    device: DeviceModel;
    numberOfVideos = 0;
    segment = 'photos';
    width;

    constructor(
        private activatedRoute: ActivatedRoute,
        private selector: TechniqueSelector,
        private router: Router
    ) {}

    ngOnInit() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
        });

        this.width = window.innerWidth;

        this.selector.getData();

        this.subscriber = this.activatedRoute.paramMap.subscribe(
            (params: ParamMap) => {
                this.id = parseInt(params.get('id'), 10);
                this.getData();
            }
        );
    }

    getData() {
        this.selector.getTechnique(this.id).subscribe((t) => {
            if (t && this.technique === undefined) {
                this.segment =
                    t.media.photos.length > 0 ? 'photos' : 'comments';
            }
            this.technique = t;
        });

        this.sub = this.selector.getDevice().subscribe((device) => {
            this.device = device;
        });
    }

    segmentChanged(event) {
        this.segment = event.detail.value;
    }

    goToNextVideo(event, mediaLength) {
        this.videoIndex = this.technique.media.videos.findIndex((m) => {
            return m.id === event;
        });
    }

    backGoTo(location) {
        this.router.navigate(['/technique/list/' + location]);
    }

    ngOnDestroy() {
        if (this.subscriber) {
            this.subscriber.unsubscribe();
        }

        this.selector.unsubscribe();
        this.sub.unsubscribe();
    }
}
