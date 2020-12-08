import {
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { MediaModel } from '../../../common/models/media';
import { DeviceModel } from '../../../common/models/device.model';
import { TechniqueModel } from '../../../common/models/technique';
import { Router } from '@angular/router';

@Component({
    selector: 'app-playlist',
    templateUrl: './playlist.component.html',
    styleUrls: ['./playlist.component.scss'],
})
export class PlaylistComponent implements OnInit {
    @Input()
    videos: MediaModel[];

    @Input()
    currentVideo: number;

    @Output()
    nextVideo = new EventEmitter<any>();

    @Input()
    nextTechniques?: TechniqueModel[];

    constructor(private router: Router) {}

    ngOnInit() {}

    getThumbnail(media): string {
        return media.url + 'Thumbnails/' + media.file_name + '.0000001.jpg';
    }

    goToNewVideo(video: MediaModel) {
        this.nextVideo.emit(video.id);
    }

    goToTechnique(id) {
        this.router.navigate(['/technique/' + id]);
    }

    getThumbnailForTechnique(technique: TechniqueModel) {
        let poster = null;
        if (technique.media.length > 0) {
            const videos: MediaModel[] = technique.media.filter(
                (m: MediaModel) => {
                    return m.folder.includes('video');
                }
            );

            if (videos.length > 0) {
                poster = this.getThumbnail(videos[0]);
            }
        }
        return poster;
    }
}
