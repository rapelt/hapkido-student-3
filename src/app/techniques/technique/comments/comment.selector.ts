import { Injectable } from '@angular/core';
import { TechniqueStoreService } from '../../../+state/Techniques/technique-store.service';
import { QuestionModel } from '../../../common/models/question.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommentSelector {
    constructor(private techniquesStoreService: TechniqueStoreService) {}

    addQuestion(question: QuestionModel): Observable<QuestionModel> {
        return this.techniquesStoreService.addQuestion(question);
    }
}
