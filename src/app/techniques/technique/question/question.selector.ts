import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
import { QuestionModel } from '../../../common/models/question.model';
import { Observable } from 'rxjs';
import { AuthStoreService } from '../../../+state/Authentication/auth-store.service';
import { map } from 'rxjs/operators';
import { DeviceModel } from '../../../common/models/device.model';

@Injectable({
    providedIn: 'root',
})
export class QuestionSelector {
    constructor(
        private techniquesStoreService: TechniqueStoreService,
        private authStoreService: AuthStoreService
    ) {}

    addQuestion(question: QuestionModel): Observable<QuestionModel> {
        return this.techniquesStoreService.addQuestion(question);
    }

    likeQuestion(question: QuestionModel): void {
        this.techniquesStoreService.likeQuestion(question.id, question.t_id);
    }

    removeLikeQuestion(question: QuestionModel): void {
        this.techniquesStoreService.removeLikeQuestion(
            question.id,
            question.t_id
        );
    }

    getStudentID(): Observable<string> {
        return this.authStoreService.stateChanged.pipe(
            map((state): string => {
                return state?.authentication?.user.username;
            })
        );
    }
}
