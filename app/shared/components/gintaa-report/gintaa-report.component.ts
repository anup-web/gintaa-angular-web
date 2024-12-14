import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-gintaa-report',
  templateUrl: './gintaa-report.component.html',
  styleUrls: ['./gintaa-report.component.scss']
})
export class GintaaReportComponent implements OnInit {

  constructor(
  ) { }

  @Output("cancel") cancel: EventEmitter<any> = new EventEmitter();
  @Output("submit") submit: EventEmitter<any> = new EventEmitter();
  @Input() questionList: any = [];
  @Input() errorMessage: string = null;
  @Input() reportType: string = null;
  @Input() closeStep: string = null;
  initiateDealComment: string = null;

  ngOnInit(): void {

  }

  clickAnswer(answer) {
    answer.selected = !answer.selected;
    this.errorMessage = '';
  }

  close() {
    this.cancel.emit();
  }

  saveReport() {

    let invalidForm = true;
    let questionAns = [];
    if (this.reportType === 'deal' || this.reportType === 'offer') {
      questionAns = this.questionList.filter((question) => {
        return question.selected;
      });
      questionAns = questionAns.map((question) => {
        if (question.selected) {
          invalidForm = false;
          return question.categoryName;
        }
      });
    } else {
      questionAns = this.questionList.map((question) => {
        let question_temp = {
          questionId: question.questionId,
          answerIds: [],
        }
        question_temp.answerIds = question.answers.filter((ans) => ans.selected)?.map((ans) => ans.answerId);
        if (question_temp.answerIds.length > 0) {
          invalidForm = false;
          return question_temp
        }
      });
    }

    if (invalidForm) {
      if (this.closeStep == 'ABANDON') {
        this.errorMessage = `Please select atleast one reason to abandon this ${this.reportType} !`;
      } else {
        this.errorMessage = `Please select atleast one reason to report this ${this.reportType} !`;
      }
    } else {
      this.submit.emit({ questionAns: questionAns, comment: this.initiateDealComment })
    }
  }

}
