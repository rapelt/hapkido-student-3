import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomePageRoutingModule } from './home-routing.module';

import { HomePage } from './home.page';
import { MessageBarComponent } from './message-bar/message-bar.component';
import { RecommendedViewingComponent } from './recommended-viewing/recommended-viewing.component';
import { UpcomingClassesComponent } from './upcoming-classes/upcoming-classes.component';
import { CategoriesComponent } from './categories/categories.component';
import { AppCommonModule } from '../common/common.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        HomePageRoutingModule,
        AppCommonModule,
    ],
    declarations: [
        HomePage,
        MessageBarComponent,
        RecommendedViewingComponent,
        UpcomingClassesComponent,
        CategoriesComponent,
    ],
})
export class HomePageModule {}
