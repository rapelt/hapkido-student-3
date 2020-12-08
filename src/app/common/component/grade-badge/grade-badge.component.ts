import { Component, Input, OnInit } from '@angular/core';
import {GradeHelper} from '../../helpers/grade/grade';

@Component({
  selector: 'app-grade-badge',
  templateUrl: './grade-badge.component.html',
  styleUrls: ['./grade-badge.component.scss']
})
export class GradeBadgeComponent implements OnInit {
  gradeHelper;

  @Input()
  grade: number;

  @Input()
  nameLength: 'short' | 'long' | 'text' = 'short';

  constructor() {
    this.gradeHelper = GradeHelper;
  }

  ngOnInit() {
  }

}
