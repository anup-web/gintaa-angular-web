import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DealResponseErrorObj } from '@gintaa/modules/deal-new/models/deal.model';
import { RatingContext, RatingRequest } from '@gintaa/modules/deal-new/models/rating.model';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-gintaa-rating',
  templateUrl: './gintaa-rating.component.html',
  styleUrls: ['./gintaa-rating.component.scss']
})
export class GintaaRatingComponent implements OnInit {

  constructor(
  ) { }

  @Output("onClickStar") onClickStar: EventEmitter<any> = new EventEmitter();
  @Output("saveRating") saveRating: EventEmitter<any> = new EventEmitter();
  @Input() questionList: any;
  @Input() errorMessage: string = null;
  @Input() gintaaRating: boolean = false;
  @Input() disableButton: boolean = false;
  @Input() userName: string = null;

  rateString: string = ''
  ratingContexts: RatingContext[] = [
    {
      minRating: 0,
      maxRating: 5,
      contextId:'testcontext',
      ratingId: '7778',
    }
  ];
  ratingConfig = {
    value: '0',
    totalstars: '5',
    checkedcolor: '#FF9500',
    uncheckedcolor: '#8CAEC5',
    size: '25px',
    readonly: false,
  };
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };
  ratingRequest: RatingRequest = {
    questionAndAnswers: [],
    comment: null,
    rating: null
  }
  initiateDealComment: string = null;
  selectedRating: number = 0;
  ratingTextArr = ['', 'Terrible', 'Poor', 'Average', 'Good', 'Excellent']

  ngOnInit(): void {

  }

  onRate($event: { oldValue: number, newValue: number, starRating: StarRatingComponent}, contextId?: string) {
    this.selectedRating = $event.newValue;
    this.rateString = this.ratingTextArr[this.selectedRating];
    this.onClickStar.emit(this.selectedRating);
  }

  resetRatingAnswers(contextId: string) {
    this.ratingContexts.forEach((ratingContext, index) => {
      if (ratingContext.contextId === contextId) {
        this.ratingContexts[index].questions = [];
      }
    });
  }

  setErrorObject(error: DealResponseErrorObj) {
    let errorMsg = error.message;
    if (!error.message) {
      if (error.payload[0]) {
        errorMsg = error.payload[0].errorDetailedReason;
      } else if (error.payload.errorDetailedReason) {
        errorMsg = error.payload.errorDetailedReason;
      } else {
        errorMsg = 'Error occurd while fetching deal details';
      }
    }
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: true,
      code: error.code,
      message: errorMsg
    };
  }

  resetErrorObject() {
    this.responseErrorObject = {
      ...this.responseErrorObject,
      showError: false,
      code: 200,
      message: ''
    };
  }

  saveUserRating() {
    // discrepency in comment post API
    const ratingRequest: RatingRequest = {
      questionAndAnswers: [],
      comment: this.initiateDealComment,
      rating: this.selectedRating
    }
    const questionAns = this.questionList.map((question)=>{
      let question_temp = {
        question:question.question,
        questionId:question.questionId,
        answers:[],
      }
      question_temp.answers = question.predictedAnswers.filter((ans)=>ans.selected)?.map((ans)=>ans.text);
      return question_temp
    });
    ratingRequest.questionAndAnswers = questionAns;
    this.saveRating.emit(ratingRequest);
  }
}
