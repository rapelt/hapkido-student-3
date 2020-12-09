import {
    ChangeDetectionStrategy,
    Component,
    Input,
    OnChanges,
    OnInit,
} from '@angular/core';
import { QuestionModel } from '../../../common/models/question.model';
import * as moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../../../common/validators/empty.validator';
import { CommentSelector } from './comment.selector';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss'],
})
export class CommentsComponent implements OnInit, OnChanges {
    @Input()
    questions: QuestionModel[];

    sortedQuestions = [];

    questionForm: FormGroup;

    saveAttempted = false;

    @Input()
    techniqueId: number;

    constructor(private fb: FormBuilder, private selector: CommentSelector) {}

    ngOnInit() {
        this.questionForm = this.fb.group({
            question: ['', [Validators.maxLength(600), emptyValidator()]],
        });
    }

    save() {
        this.saveAttempted = true;

        if (this.questionForm.valid) {
            const q: QuestionModel = {
                id: null,
                t_id: this.techniqueId,
                hb_id: null,
                student: null,
                replay_id: null,
                question_text: this.questionForm.value.question,
                createdAt: null,
                likes: [],
            };

            this.selector.addQuestion(q).subscribe((newq) => {
                this.saveAttempted = false;
                this.questionForm.reset();
            });
        }
    }

    ngOnChanges() {
        this.sortedQuestions = [];
        this.questions
            .filter((q) => {
                return q.replay_id === null;
            })
            .map((q) => {
                const newQ = {
                    ...q,
                    reply: [],
                };

                const index = this.sortedQuestions.findIndex((s) => {
                    return s.id === q.id;
                });

                if (index === -1) {
                    this.sortedQuestions = [...this.sortedQuestions, newQ];
                    // this.sortedQuestions.push(newQ);
                }
            });

        this.sort(this.sortedQuestions);

        this.questions
            .filter((q) => {
                return q.replay_id !== null;
            })
            .map((q) => {
                const index = this.sortedQuestions.findIndex((sq) => {
                    return sq.id === q.replay_id;
                });

                if (index >= 0) {
                    const replyIndex = this.sortedQuestions[
                        index
                    ].reply.findIndex((s) => {
                        return s.id === q.id;
                    });

                    if (replyIndex === -1) {
                        this.sortedQuestions[index].reply.push(q);
                    }

                    this.sort(this.sortedQuestions[index].reply);
                }
            });
    }

    sort(array) {
        return array.sort((a, b) => {
            a = moment(a.createdAt);
            b = moment(b.createdAt);
            if (a.isBefore(b)) {
                return 1;
            }
            if (a.isAfter(b)) {
                return -1;
            }
            return 0;
        });
    }
}
