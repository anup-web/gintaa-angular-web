import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { Subscription } from 'rxjs';
import { IntersectionStatus } from '@gintaa/shared/directives/from-intersection-observer';
import { Moment } from 'moment';
@Component({
  selector: 'app-my-deal-list',
  templateUrl: './my-deal-list.component.html',
  styleUrls: ['./my-deal-list.component.scss']
})
export class MyDealListComponent implements OnInit {

  errorMessage: string = null;
  successMessage: string = null;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  amountImage: string = 'assets/images/deal/deal-price.svg';
  @Output("navigateToDealDetails") navigateToDealDetails: EventEmitter<any> = new EventEmitter();
  @Output("addToFavourite") addToFavourite: EventEmitter<any> = new EventEmitter();
  @Output("scrollDown") scrollDown: EventEmitter<any> = new EventEmitter();
  @Output("updateSortBy") updateSortBy: EventEmitter<any> = new EventEmitter();
  @Input('favDealRefId') favDealRefId: any;
  @Input('isPageLoading') isPageLoading: boolean = true;
  @Input('deals') deals: any = [];
  @Input('sortBy') sortBy: string;
  dealStateSubscription: Subscription;
  visibilityStatus: {[key: number]: IntersectionStatus} = {};
  intersectionStatus = IntersectionStatus;

  constructor(
  ) { }

  ngOnInit(): void {
  }
  
  onClick(dealId: string, dealType: string, callerIsReceiver, directBuy=false){
    this.navigateToDealDetails.emit({dealId, dealType:dealType, callerIsReceiver, directBuy});
  }

  onClickFav(dealId: string, actionType:string = 'add'){
    this.addToFavourite.emit({dealId, actionType});
  }

  getDealCardHeaderFormattedName(deal: DealDetailsFormat) {
    let name = '';
    let date = new Date(deal.dealSentTimeStamp);
    if (deal.callerIsReceiver) {
      name = deal.sender.name;
    } else {
      name = deal.receiver.name;
    }
    return deal.dealSentTimeStamp;
   // return `${date.toDateString().split(' ')[1]} ${date.toDateString().split(' ')[2]}`;
  }

  fetchDealSenderOfferImageTile(deal: DealDetailsFormat) {
    if (deal.offeredOffers?.length > 0) {
      return deal.offeredOffers[0].images.length
        ? [ true, deal.offeredOffers[0].images[0].url ]
        : [ true, null ];
    } else {
      return [ false, null ];
    }
  }

  fetchDealReceiverOfferImageTile(deal: DealDetailsFormat) {
    if (deal.requestedOffers.length > 0) {
      return deal.requestedOffers[0].images.length
        ? [ true, deal.requestedOffers[0].images[0].url ]
        : [ true, null ];
    } else {
      return [ false, null ];
    }
  }

  fetchrequestedAmount(deal: DealDetailsFormat) {
    if (deal.requestedAmount > 0) {
      return deal.requestedAmount;
    } else {
      return 'Free';
    }
  }
  
  isFavAddedd(deal:any){
    if(deal?.dealRefId){
      if(this.favDealRefId && this.favDealRefId.favAdded && this.favDealRefId.favRemoved && ( this.favDealRefId.favAdded.length || this.favDealRefId.favRemoved.length) ){
        if(this.favDealRefId.favAdded.includes(deal.dealRefId)){
          return true;
        } else if(this.favDealRefId.favRemoved.includes(deal.dealRefId)){
          return false;
        } else {
          return deal?.favouriteDeal;
        }
      } else {
        return deal?.favouriteDeal;
      }
    }
  }

  ngOnDestroy(){
    //this.dealStateSubscription.unsubscribe();
  }
  
  onVisibilityChanged(index: number, status: IntersectionStatus) {
    this.visibilityStatus[index] = status;
  }

  onScrollDown(){
    if (this.deals.length && this.deals.length % 10 === 0) {
      this.scrollDown.emit(this.deals.length);
    }
  }

  changeSortBy(){
    this.updateSortBy.emit(this.sortBy);
  }
  isDealRated(deal:DealDetailsFormat){
    return deal?.callerIsReceiver ? deal?.dealReceiverRating : deal?.dealSenderRating;
  }

}
