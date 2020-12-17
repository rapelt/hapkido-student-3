import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { QuestionModel } from '../../common/models/question.model';
import { StudentModel } from '../../common/models/student.model';
import { ClassModel } from '../../common/models/class.model';

@Injectable({
    providedIn: 'root',
})
export class ClassHttp {
    classUrl = 'http://localhost:8080/classes/';

    constructor(private httpClient: HttpClient) {
        this.classUrl = config['classAPIEndpoint'];
    }

    getClasses(): Observable<ClassModel[]> {
        return this.httpClient.get(
            this.classUrl + 'getnextclasses'
        ) as Observable<ClassModel[]>;
    }
}
