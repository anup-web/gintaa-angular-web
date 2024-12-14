import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DealResponseErrorObj } from '@gintaa/modules/deal-new/models/deal.model';
import { RatingRequestDeal } from '@gintaa/modules/deal-new/models/rating.model';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { selectDealState, ratingQuestionsSelector, dealErrorSelector, closeDealModel } from '@gintaa/modules/deal-new/store/deal.selectors';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-feedback',
  templateUrl: './user-feedback.component.html',
  styleUrls: ['./user-feedback.component.scss']
})
export class UserFeedbackComponent implements OnInit, OnDestroy {

  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();
  @Input() dealRefNo: string;
  @Input() closeDeal: boolean = false;
  @Input() identityId: string;

  dealStateSubscriber: Subscription;
  ratingQuestionsSubscriber: Subscription;
  dealErrorSubscriber: Subscription;
  closeDealSubscriber: Subscription;
  dealDetails: any = [];
  errorMessage: string = null;
  disableButton: boolean = true;
  selectedStar:number = 0;
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
  userDetails: any = null;
  questionList: any = []
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';

  constructor(
    private store: Store<gintaaApp.AppState>,
  ) { }

  ngOnInit(): void {
    // this.getRatingsConfig();
    this.lastFetchedDealDetailsSubscriber();
    this.ratingQuestionSubscriber();
  }

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      this.dealDetails = {
        ...dealDetails.lastFetchedDealDetails
      };
      if(this.dealDetails?.receiver) {
        if(this.identityId === this.dealDetails?.receiver?.id) {
          this.userDetails = this.dealDetails.sender;
        } else{
          this.userDetails = this.dealDetails.receiver;
        }
      }
    })
  }

  ratingQuestionSubscriber() {
    this.ratingQuestionsSubscriber = this.store.select(ratingQuestionsSelector).subscribe(questionList => {
      let question_list_temp = {...questionList};
      let questionListTemp = [];
      if(question_list_temp && question_list_temp.hasOwnProperty(this.selectedStar)){
        const questionList:any = question_list_temp[this.selectedStar];
        if(questionList && Array.isArray(questionList)){
          questionListTemp = questionList.map((question:any)=>{
            let question_temp = {...question}
            question_temp.predictedAnswers = question.predictedAnswers.map((ans)=>{return {text:ans, selected:false}});
            return question_temp
          });
        }
      }
      this.questionList = questionListTemp;
     // console.log("=====",this.questionList);
    });

    this.dealErrorSubscriber = this.store.select(dealErrorSelector).subscribe(message => {
      this.errorMessage = message;
    });

    this.closeDealSubscriber = this.store.select(closeDealModel).subscribe((type: any) => {
      if(type === 'rating') {
        this.closeModel.emit();
      }
      this.store.dispatch(
        DealActions.closeModel({modelType:''})
      );
    });
  }

  close(){
    if(this.closeDeal){
      this.closeModel.emit('RATE_USER');
    } else{
      this.closeModel.emit();
    }
  }

  getRatingsConfig() {
    this.store.dispatch(
      DealActions.getRatingConfig()
    );
  }

  onClickStar(rate){
    this.selectedStar = rate;
    this.store.dispatch(
      DealActions.getQuestionsForRating({newValue: rate})
    );
    if(rate > 0){
      this.disableButton = false;
    }
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

  saveUserRating($event) {
    // discrepency in comment post API
    const ratingRequest: RatingRequestDeal = {
      reviews: $event.questionAndAnswers ? $event.questionAndAnswers : [],
      comment: $event.comment,
      dealRefId: this.dealRefNo,
      rating: $event.rating
    }
    this.store.dispatch(
      DealActions.saveDealUserRating({requestData:ratingRequest})
    );
    this.disableButton = true;
    setTimeout(() => {
      this.disableButton = false;
    }, 5000);
  }

  ngOnDestroy() {
    this.ratingQuestionsSubscriber.unsubscribe();
    this.dealErrorSubscriber.unsubscribe();
    this.dealStateSubscriber.unsubscribe();
    this.closeDealSubscriber.unsubscribe();
  }
}
