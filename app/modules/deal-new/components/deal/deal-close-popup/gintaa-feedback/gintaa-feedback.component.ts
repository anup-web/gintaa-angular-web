import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { DealResponseErrorObj } from '@gintaa/modules/deal-new/models/deal.model';
import { RatingRequestDeal } from '@gintaa/modules/deal-new/models/rating.model';
import {
  selectDealState,
  ratingQuestionsSelector,
  dealErrorSelector,
  closeDealModel
} from '@gintaa/modules/deal-new/store/deal.selectors';

@Component({
  selector: 'app-gintaa-feedback',
  templateUrl: './gintaa-feedback.component.html',
  styleUrls: ['./gintaa-feedback.component.scss']
})
export class GintaaFeedbackComponent implements OnInit, OnDestroy {

  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();
  @Input() dealRefNo: string;
  
  ratingQuestionsSubscriber: Subscription;
  dealStateSubscriber: Subscription;
  dealDetails: any = [];
  errorMessage: string = null;
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };
  ratingRequest: RatingRequestDeal = {
    reviews: [],
    comment: null,
    dealRefId: null,
    rating: null
  }
  questionList: any = []

  constructor(
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    this.lastFetchedDealDetailsSubscriber();
    this.ratingQuestionSubscriber();
  }

  ratingQuestionSubscriber(){
    this.ratingQuestionsSubscriber = this.store.select(ratingQuestionsSelector).subscribe(questionList => {
      if(questionList){
        const questions = questionList.map((question:any)=>{
          let question_temp = {...question}
          question_temp.predictedAnswers = question.predictedAnswers.map((ans)=>{return {text:ans, selected:false}});
          return question_temp
        });
        this.questionList = questions
      }
      
    });
    this.store.select(dealErrorSelector).subscribe(message => {
      this.errorMessage = message;
    });
    this.store.select(closeDealModel).subscribe((type: any) => {
      if(type === 'rating'){
        this.closeModel.emit();
      } 
      this.store.dispatch(
        DealActions.closeModel({modelType:''})
      );
    });
  }

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      this.dealDetails = {
        ...dealDetails.lastFetchedDealDetails
      };
    })
  }

  getRatingsConfig() {
    this.store.dispatch(
      DealActions.getRatingConfig()
    );
  }

  onClickStar(rate){
    this.store.dispatch(
      DealActions.getQuestionsForRating({newValue: rate})
    );
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

  finishRate($event){
    const ratingRequest: RatingRequestDeal = {
      reviews: $event.questionAndAnswers ? $event.questionAndAnswers : [],
      comment: $event.comment,
      dealRefId: this.dealRefNo,
      rating: $event.rating
    }

    this.store.dispatch(
      DealActions.saveDealGintaaRating({ requestData:ratingRequest })
    );
  }

  close(){
    this.closeModel.emit();
  }

  ngOnDestroy() {
    this.ratingQuestionsSubscriber.unsubscribe();
    this.dealStateSubscriber.unsubscribe();
  }

}
