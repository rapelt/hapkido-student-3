import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    SimpleChanges,
    ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import videojs from 'video.js';
import { MediaModel } from '../../../common/models/media';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Platform } from '@ionic/angular';
import { DeviceModel } from '../../../common/models/device.model';
import { VideoSelector } from './video.selector';

@Component({
    selector: 'app-video',
    templateUrl: './video.component.html',
    styleUrls: ['./video.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoComponent implements OnInit, OnDestroy, OnChanges {
    @ViewChild('target', { static: true }) target: ElementRef;
    elem;

    currentScreenOrientation;

    @Input()
    media: MediaModel;

    @Input()
    device: DeviceModel;

    player: videojs.Player;

    viewSaved = false;

    constructor(
        private elementRef: ElementRef,
        private screenOrientation: ScreenOrientation,
        public platform: Platform,
        public videoSelector: VideoSelector
    ) {}

    ngOnInit() {
        window.addEventListener('resize', () => {
            this.player.dimensions(this.getVideoWidth(), this.getVideoHeight());
        });

        this.elem = document.getElementById('target');

        this.currentScreenOrientation = this.screenOrientation.type;

        const options = {
            sources: [
                {
                    src: this.getVideoUrl(),
                    type: 'video/mp4',
                },
            ],
            poster:
                this.media.url +
                'Thumbnails/' +
                this.media.file_name +
                '.0000001.jpg',
            preload: 'none',
            controls: true,
            height: this.getVideoHeight(),
            width: this.getVideoWidth(),
        };

        this.player = videojs(this.target.nativeElement, options, () => {
            console.log('onPlayerReady', this);
            // this.isFullscreen_ = true;
            // console.log(this.isFullscreen_);
        });

        this.player.on('play', () => {
            this.saveView();
        });

        this.player.on('fullscreenchange', () => {
            console.log(this.player.isFullscreen_);
            if (this.player.isFullscreen_) {
                this.setLandscape();
            } else {
                this.setPortrait();
            }
        });

        this.player.on('ended', (event) => {
            console.log('ended', event);
            this.viewSaved = false;
        });
    }

    openFullscreen() {
        if (this.elem.requestFullscreen) {
            this.elem.requestFullscreen();
        } else if (this.elem.webkitRequestFullscreen) {
            /* Safari */
            this.elem.webkitRequestFullscreen();
        } else if (this.elem.msRequestFullscreen) {
            /* IE11 */
            this.elem.msRequestFullscreen();
        }
    }

    saveView() {
        console.log('Save Video', this.viewSaved);
        if (!this.viewSaved) {
            console.log('Saving', this.viewSaved);

            this.videoSelector.addView(this.media.id);
            this.viewSaved = true;
        }
    }

    setLandscape() {
        // set to landscape
        this.screenOrientation.lock('landscape');
    }

    setPortrait() {
        // set to portrait
        this.screenOrientation.lock('portrait');
    }

    getVideoUrl() {
        return (
            this.media.url +
            'MP4/' +
            this.media.file_name +
            '.' +
            this.media.file_type
        );
    }

    ngOnChanges(changes: SimpleChanges) {
        console.log(changes);

        this.media = changes.media.currentValue;

        const options = {
            sources: [
                {
                    src: this.getVideoUrl(),
                    type: 'video/mp4',
                },
            ],
            poster:
                this.media.url +
                'Thumbnails/' +
                this.media.file_name +
                '.0000000.jpg',
        };

        console.log(this.player);

        if (this.player) {
            this.player.src(options.sources);
            this.player.poster(options.poster);
        }
    }

    ngOnDestroy() {
        // destroy player
        if (this.player) {
            this.player.dispose();
        }
    }

    getVideoHeight(): number {
        if (this.device.isMobile || this.device.isMobileWeb) {
            if (this.currentScreenOrientation.includes('portrait')) {
                return window.innerWidth / 2;
            }

            if (this.currentScreenOrientation.includes('landscape')) {
                return window.innerHeight - 56;
            }
        }

        if (this.device.isDesktop || this.device.isTablet) {
            if (window.innerWidth > 1000) {
                return (window.innerWidth - 40) / 1.5 / 2;
            } else {
                return (window.innerWidth - 40) / 2;
            }
        }
        return window.innerHeight - 56;
    }

    getVideoWidth(): number {
        if (
            !this.device.isTablet &&
            (this.device.isMobile || this.device.isMobileWeb)
        ) {
            return window.innerWidth;
        }

        if (this.device.isDesktop || this.device.isTablet) {
            if (window.innerWidth > 1000) {
                return (window.innerWidth - 40) / 1.5;
            } else {
                return window.innerWidth - 40;
            }
        }
        return window.innerWidth;
    }
}
