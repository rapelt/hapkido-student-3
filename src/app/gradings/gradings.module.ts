import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GradingsPageRoutingModule } from './gradings-routing.module';

import { GradingsPage } from './gradings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GradingsPageRoutingModule
  ],
  declarations: [GradingsPage]
})
export class GradingsPageModule {}
