import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { config } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { TechniqueModel } from '../../common/models/technique';
import { QuestionModel } from '../../common/models/question.model';
import { StudentModel } from '../../common/models/student.model';

@Injectable({
    providedIn: 'root',
})
export class StudentHttp {
    studentUrl = 'http://localhost:8080/student/';

    constructor(private httpClient: HttpClient) {
        this.studentUrl = config['studentAPIEndpoint'];
    }

    getStudent(hbid): Observable<StudentModel> {
        return this.httpClient.get(
            this.studentUrl + 'sa/' + hbid
        ) as Observable<StudentModel>;
    }
}
