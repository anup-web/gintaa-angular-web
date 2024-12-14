import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { DealResponseErrorObj, DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { RatingRequestDeal } from '@gintaa/modules/deal-new/models/rating.model';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectDealState } from '@gintaa/modules/deal-new/store/deal.selectors';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-abondon-deal',
  templateUrl: './abondon-deal.component.html',
  styleUrls: ['./abondon-deal.component.scss']
})
export class AbondonDealComponent implements OnInit, OnDestroy {

  dealStateSubscriber: Subscription;
  dealQnASubscriber: Subscription;
  dealReportSubscriber: Subscription;
  @Output("closeModel") closeModel: EventEmitter<any> = new EventEmitter();
  @Input() dealRefNo: string;
  @Input() closeStep: string;
  dealDetails: any = null;
  errorMessage: string = null;
  responseErrorObject: DealResponseErrorObj = {
    showError: false,
    code: 400,
    message: '',
    success: false
  };
  ratingRequest: RatingRequestDeal = {
    questionAndAnswers: [],
    comment: null,
    dealRefId: null,
    rating: null
  }
  questionList: any = []

  constructor(
    private store: Store<gintaaApp.AppState>,
    private router: Router,
    private dealService: DealService,
  ) { }

  ngOnInit(): void {
    this.lastFetchedDealDetailsSubscriber();
    this.getDealQnA();
  }

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      this.dealDetails = {
        ...dealDetails.lastFetchedDealDetails
      };
    })
  }

  getDealQnA() {
    this.dealQnASubscriber = this.dealService.getDealCatList()
      .subscribe(result => {
        if (result['code'] == '200') {
          const questionsTemp = result['payload'] ? result['payload'] : [];
          const questions = questionsTemp.map((question:any)=>{
            let question_temp = {...question, selected:false}
            return question_temp
          });
          this.questionList = questions
        }
      });
  }

  cancel() {
    this.closeModel.emit();
  }

  fetchDealSenderOfferImageTile(deal: DealDetailsFormat) {
    if (deal.offeredOffers.length > 0) {
      return deal.offeredOffers[0].images.length
        ? [true, deal.offeredOffers[0].images[0].url]
        : [true, null];
    } else {
      return [false, null];
    }
  }

  fetchDealReceiverOfferImageTile(deal: DealDetailsFormat) {
    if (deal.requestedOffers.length > 0) {
      return deal.requestedOffers[0].images.length
        ? [true, deal.requestedOffers[0].images[0].url]
        : [true, null];
    } else {
      return [false, null];
    }
  }

  fetchrequestedAmount(deal: DealDetailsFormat) {
    if (deal.requestedAmount > 0) {
      return deal.requestedAmount;
    } else {
      return null;
    }
  }

  submit(data:any) {
    const questionAns = data?.questionAns ? data?.questionAns : [] ;
    const comment = data?.initiateDealComment ? data?.initiateDealComment : '';
    const abondonRequest = {
      reportCategoryNames: [],
      reportDealComment: comment,
      dealRefNo: this.dealRefNo
    };
    let invalidForm = true;
    if( questionAns && questionAns.length > 0){
      invalidForm = false;
      abondonRequest.reportCategoryNames = questionAns;
    }
    if(invalidForm){
      if(this.closeStep == 'ABANDON'){
        this.errorMessage = 'Please select atleast one reason to abandon this deal!';
      } else{
        this.errorMessage = 'Please select atleast one reason to report this deal!';
      }
    } else {
      this.dealReportSubscriber = this.dealService.abandonReportDeal(abondonRequest, this.closeStep)
      .subscribe(result => {
        if (result['body']['code'] == '200') {
          this.closeModel.emit();
          setTimeout(() => {
            if(this.closeStep == 'ABANDON'){
              this.router.navigate([`/deals/abandoned/${this.dealRefNo}`]);
            } else{
              this.router.navigate([`/deals/reported/${this.dealRefNo}`]);
            }
          }, 100);
        } else {
          if(this.closeStep == 'ABANDON'){
            this.errorMessage = 'Failed to abandon deal, Please try again!';
          } else{
            this.errorMessage = 'Failed to report deal, Please try again!!';
          }
        }
      }, err => {
        if(this.closeStep == 'ABANDON'){
          this.errorMessage = 'Failed to abandon deal, Please try again!';
        } else{
          this.errorMessage = 'Failed to report deal, Please try again!!';
        }
      });
    }
  }


  ngOnDestroy() {
   try{
    this.dealStateSubscriber.unsubscribe();
    this.dealQnASubscriber.unsubscribe();
    this.dealReportSubscriber.unsubscribe();
   } catch(err){

   }
  }
}
