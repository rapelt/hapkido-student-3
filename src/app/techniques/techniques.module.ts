import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TechniquesPageRoutingModule } from './techniques-routing.module';

import { TechniquesPage } from './technique-set-list/techniques.page';
import { AppCommonModule } from '../common/common.module';
import { TechniqueListPage } from './technique-list/technique-list.page';
import { TechniquePage } from './technique/technique.page';
import { VideoComponent } from './technique/video/video.component';
import { VideoDetailsComponent } from './technique/video-details/video-details.component';
import { PlaylistComponent } from './technique/playlist/playlist.component';
import { InformationComponent } from './technique/information/information.component';
import { PhotosComponent } from './technique/photos/photos.component';
import { CommentsComponent } from './technique/comments/comments.component';
import { OtherComponent } from './technique/other/other.component';
import { QuestionComponent } from './technique/question/question.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        TechniquesPageRoutingModule,
        AppCommonModule,
        ReactiveFormsModule,
    ],
    providers: [],
    declarations: [
        TechniquesPage,
        TechniqueListPage,
        TechniquePage,
        VideoComponent,
        VideoDetailsComponent,
        PlaylistComponent,
        InformationComponent,
        PhotosComponent,
        CommentsComponent,
        OtherComponent,
        QuestionComponent,
    ],
})
export class TechniquesPageModule {}
