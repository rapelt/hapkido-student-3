import { NgModule } from '@angular/core';
import { SomethingComponent } from './component/something/something.component';
import { GradeHelper } from './helpers/grade/grade';
import { GradeBadgeComponent } from './component/grade-badge/grade-badge.component';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { ValidationErrorMessageComponent } from './validators/validation-error-message/validation-error-message.component';

@NgModule({
    declarations: [
        SomethingComponent,
        GradeBadgeComponent,
        ValidationErrorMessageComponent,
    ],
    imports: [CommonModule, IonicModule, RouterModule],
    providers: [GradeHelper],
    exports: [
        SomethingComponent,
        GradeBadgeComponent,
        ValidationErrorMessageComponent,
    ],
})
export class AppCommonModule {}
