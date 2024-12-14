import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { OfferShareService } from '@gintaa/shared/services';
import { DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-offers-deals',
  templateUrl: './offers-deals.component.html',
  styleUrls: ['./offers-deals.component.scss']
})
export class OffersDealsComponent implements OnInit {

  @Input() offerId: string;
  @Input() offerName: string;
  @Output("checkIsOfferInitiated") checkIsOfferInitiated: EventEmitter<any> = new EventEmitter();
  @Output("navigateToDealDetails") navigateToDealDetails: EventEmitter<any> = new EventEmitter();


  deals: any = [];
  dealCount: number = 0;
  amountImage: string = 'assets/images/deal/deal-price.svg';
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  offerNoImage: string = 'assets/images/create-offer/uplaod-default-img.png';

  constructor(
    private offerShareService: OfferShareService,
    private router: Router,
  ) {

  }

  ngOnInit(): void {
    //console.log("----------------------------------------------------")
    this.getOfferDealByOfferId(this.offerId);
  }

  getOfferDealByOfferId(id: string) {
    this.offerShareService.getOwnerByOfferId(id)
      .subscribe(result => {
        if (result['code'] == '200') {
          const payload = result['payload'] ? result['payload'] : [];
          console.log("payload", payload);
          this.dealCount = payload.length;
          if (this.dealCount) {
            if (payload.length > 2) {
              this.deals = payload.slice(0, 2);
            } else {
              this.deals = payload;
              //console.log("this.deals", this.deals);
            }
            const dealStatusList = ['INITIATED', 'REVISED', 'ACCEPTED', 'PARTIAL_CLOSED'];
            for (let i = 0; i < dealStatusList.length; i++) {
              const findInitiate = payload.findIndex((val) => val?.dealStatus?.dealStatus === dealStatusList[i]);
              // console.log("======== is Initiate ?????",findInitiate);
              if (findInitiate == -1) {
                this.checkIsOfferInitiated.emit(false)
              } else {
                this.checkIsOfferInitiated.emit(true);
                return false;
              }
            }



          }

          // this.deals = payload;
          // if(payload.length > 2){
          //   this.deals = payload.slice(0, 2);
          // } else{
          //   this.deals = payload;
          //   console.log("this.deals",this.deals);
          // }
        }
      });
  }

  getDealCardHeaderFormattedName(deal: DealDetailsFormat) {
    let name = deal.sender.name;
    let date = new Date(deal.dealSentTimeStamp);
    return `${name}, ${date.toDateString().split(' ')[1]} ${date.toDateString().split(' ')[2]}`;
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

  isGetIncomming(deal: DealDetailsFormat) {
    //console.log("deal: DealDetailsFormat",deal.callerIsReceiver)
    return deal.callerIsReceiver;
  }

  showAll() {
    this.router.navigate([`/deals/offer/${this.offerId}/${this.offerName}`]);
  }

  fetchrequestedAmount(deal: DealDetailsFormat) {
    if (deal.requestedAmount > 0) {
      return deal.requestedAmount;
    } else {
      return null;
    }
  }
  onClick(dealId: string, dealType: string, callerIsReceiver, directBuy = false) {
    this.navigateToDealDetails.emit({ dealId, dealType: dealType, callerIsReceiver, directBuy });
  }

  titleCase(str) {
    return str.split(' ').map(item =>
      item.charAt(0).toUpperCase() + item.slice(1).toLowerCase()).join(' ');
  }

  ConvertToLowerCase(str) {
    return str.toLowerCase();
  }
}
