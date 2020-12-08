import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emptyValidator } from '../../../common/validators/empty.validator';
import { QuestionModel } from '../../../common/models/question.model';
import { QuestionSelector } from './question.selector';
import * as moment from 'moment';

@Component({
    selector: 'app-question',
    templateUrl: './question.component.html',
    styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
    @Input()
    question;

    @Input()
    isReply = false;

    @Input()
    canReply = false;

    replyActive = false;

    replyForm: FormGroup;

    saveAttempted = false;

    studentID;

    constructor(private fb: FormBuilder, private selector: QuestionSelector) {}

    ngOnInit() {
        this.selector.getStudentID().subscribe((id) => {
            this.studentID = id;
        });

        this.replyForm = this.fb.group({
            reply: ['', [Validators.maxLength(600), emptyValidator()]],
        });
    }

    save() {
        this.saveAttempted = true;

        if (this.replyForm.valid) {
            const q: QuestionModel = {
                id: null,
                t_id: this.question.t_id,
                hb_id: null,
                student: null,
                replay_id: this.question.id,
                question_text: this.replyForm.value.reply,
                createdAt: null,
                likes: [],
            };

            this.selector.addQuestion(q).subscribe((newq) => {
                this.replyActive = false;
            });
        }
    }

    enter(event) {
        console.log(event.key);
        if (event.key === 'Enter') {
            this.save();
        }
    }

    like(q) {
        this.selector.likeQuestion(q);
    }

    studentLiked(q) {
        if (!q) {
            return null;
        }
        return q.likes.includes(this.studentID);
    }

    removeLike(q) {
        this.selector.removeLikeQuestion(q);
    }

    getDate(q) {
        if (!q) {
            return null;
        }
        return moment(q.createdAt).fromNow();
    }
}
