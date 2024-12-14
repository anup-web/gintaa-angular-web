import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllDesireTypes, CREATE_OFFER_TYPE } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { CreateOfferSectionToggles } from '@gintaa/modules/create-offer/store/models/create-offer';
import { selectOfferInfo, selectOfferSectionoggles, selectOfferUploadLoader } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-post-offer',
  templateUrl: './post-offer.component.html',
  styleUrls: ['./post-offer.component.scss']
})
export class PostOfferComponent implements OnInit {

  offer: Offer;
  sectionToggles: CreateOfferSectionToggles;
  offerPostFailure: string;
  offerSubmitProgress: boolean;

  // used for edit offer
  offerCategory: string;
  offerId: string;
  buttonLabel: string = 'submit';

  constructor(
    private store: Store<gintaaApp.AppState>,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.offerCategory = this.route.snapshot.queryParamMap.get('category') || 'DRAFT';
    this.offerId = this.route.snapshot.queryParamMap.get('id');
    this.buttonLabel = this.offerCategory === 'PUBLISHED' && this.offerId ? 'update' : 'submit';
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe(currentOffer => {
      this.offer = currentOffer;
    });

    this.store.pipe(
      select(selectOfferSectionoggles)
    ).subscribe(sectionToggles => {
      this.sectionToggles = { ...sectionToggles };
    });

    this.store.pipe(
      select(selectOfferUploadLoader)
    ).subscribe(offerSubmitProgress => {
      this.offerSubmitProgress = offerSubmitProgress;
    })

    // disabled post offer section on load for edit offer
    if(this.offerCategory === 'PUBLISHED' && this.offerId) {
      this.store.dispatch(CreateOfferActions.disablePostOfferSection());
    }
  }

  submitOffer(): void {
    let formValue = {
      ...this.offer,
      categoryId: this.offer.category?.categoryId,
      draftId: this.offer.draftOfferId
    }

    if (this.offer.auctioned) {
      let formattedEndDate = null;
      if (typeof this.offer.auctionInfo.endDate === 'object') {
        const dateStr = new Date(this.offer.auctionInfo.endDate).toISOString();
        formattedEndDate = dateStr.substr(0, dateStr.length - 1) + '+0530';
      } else if (typeof this.offer.auctionInfo.end === 'object') {
        const dateStr = new Date(this.offer.auctionInfo.endDate).toISOString();
        formattedEndDate = dateStr.substr(0, dateStr.length - 1) + '+0530';
      } else {
        formattedEndDate = this.offer.auctionInfo?.end ? this.offer.auctionInfo?.end : this.offer.auctionInfo?.endDate;
      }

      const endDate = formattedEndDate;

      formValue = {
        ...formValue,
        auctionInfo: {
          ...this.offer.auctionInfo,
          endDate,
        }
      }
    } else {
      // remove auction related fields
      delete formValue.auctionInfo;
    }

    if (!this.offer.quantity) {
      formValue = {
        ...formValue,
        quantity: 1,
      }
    }

    // for listing type money remove desire obj if exists
    if (this.offer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_EXCHANGE) {
      delete formValue.desire;
    }

    if(this.offer.auctioned === false) {
      delete formValue.auctionInfo;
    }

    // for service offer copy rate into price
    if (this.offer.offerType === CREATE_OFFER_TYPE.SERVICE) {
      formValue = {
        ...formValue,
        price: this.offer.rate
      }
    }

    // for item offer mark negotiable as false if null
    if (this.offer.offerType === CREATE_OFFER_TYPE.ITEM) {
      if (this.offer.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY && !this.offer.negotiable) {
        formValue = {
          ...formValue,
          negotiable: !!this.offer.negotiable
        }
      }
    }

    // for business offer update the flags
    if (this.offer.business?.businessId) {
      formValue = {
        ...formValue,
        location: {
          ...formValue.location,
          addressLine: formValue.location?.addressLine ? formValue.location?.addressLine : formValue.location?.addressLine1,
          lat: formValue.location?.lat ? formValue.location?.lat : formValue.location?.latitude,
          lng: formValue.location?.lng ? formValue.location?.lng : formValue.location?.longitude,
        }
      }
    }

    // show loader
    this.store.dispatch(CreateOfferActions.uploadOfferProgress());

    // for edit offer
    if (this.offerCategory === 'PUBLISHED' && this.offerId) {
      // delete documents 
      delete formValue.documents;
      this.store.dispatch(CreateOfferActions.removeDraftOffer({id: this.offer.draftOfferId}));
      this.store.dispatch(
        CreateOfferActions.updateOffer({ formValue, offerId: this.offerId })
      );
    } else {
      this.store.dispatch(
        CreateOfferActions.submitOffer({ formValue })
      );
    }    
  }

}
