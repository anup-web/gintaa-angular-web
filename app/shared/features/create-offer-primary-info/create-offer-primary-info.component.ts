import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllDesireTypes, CREATE_OFFER_TITLE, CREATE_OFFER_TYPE } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { CreateOfferActions } from '@gintaa/modules/create-offer/store/action-types';
import { CreateOfferSectionToggles } from '@gintaa/modules/create-offer/store/models/create-offer';
import { selectOfferInfo, selectOfferSectionoggles } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-create-offer-primary-info',
  templateUrl: './create-offer-primary-info.component.html',
  styleUrls: ['./create-offer-primary-info.component.scss']
})
export class CreateOfferPrimaryInfoComponent implements OnInit {

  step = 0;
  _offerType: string;
  _customError: Object;
  offer: Offer;
  hideDesireSection: boolean = false;
  sectionToggles: CreateOfferSectionToggles;

  @Input()
  set offerType(type: string) {
    this._offerType = type;
  }

  @Input()
  set customError(error: {}) {
    this._customError = error;
  }

  constructor(
    private store: Store<gintaaApp.AppState>,
    private _route: ActivatedRoute
  ) {
    this._offerType = this._route.snapshot.data['offerType'];
  }

  ngOnInit(): void {
    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe((offer: Offer) => {
      this.offer = offer;
      this.hideDesireSection = this.offer.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY || this.offer.exchangeMode === AllDesireTypes.OFFER_DESIRE_FREE;
    });

    this.store.pipe(
      select(selectOfferSectionoggles)
    ).subscribe(sectionToggles => {
      this.sectionToggles = { ...sectionToggles };
    });
  }

  setStep(index: number) {
    this.step = index;
    if (index === 0) {
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'itemProductDetails' }));
    } else if (index === 1) {
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'itemProductAttrAndTags' }));
    } else if (index === 2) {
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'itemWantInReturn' }));
    } else {
      this.store.dispatch(CreateOfferActions.updateCurrentActiveSection({ name: 'itemProductDetails' }));
    }
  }

  prevStep() {
    this.step--;
  }

  nextStep() {
    if (this.step === 0) {
      this.saveDraftOfferFromStore();
    }
    if (this.step === 1) {
      const offer = {
        offerType: this._offerType,
        offerId: this.offer?.draftOfferId,
        categoryId: this.offer?.category?.categoryId,
        facets: this.offer?.facets
      }
      this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({offer}))
    }
    this.step++;
  }

  get isItem(): boolean {
    return this._offerType.toLowerCase() === CREATE_OFFER_TYPE.ITEM.toLowerCase();
  }

  get isService(): boolean {
    return this._offerType.toLowerCase() === CREATE_OFFER_TYPE.SERVICE.toLowerCase();
  }

  get isAuction(): boolean {
    return this._offerType.toLowerCase() === CREATE_OFFER_TYPE.AUCTION.toLowerCase();
  }

  get basicInfoTitle(): string {
    if (this.isItem) {
      return CREATE_OFFER_TITLE.HEADER_ITEM_TITLE
    } 
    else if (this.isService) {
      return CREATE_OFFER_TITLE.HEADER_SERVICE_TITLE
    }
    else if (this.isAuction) {
      return CREATE_OFFER_TITLE.HEADER_AUCTION_TITLE
    }
  }

  saveDraftOfferFromStore() {
    const offer = {
      ...this.offer,
      offerType: this._offerType,
      offerId: this.offer?.draftOfferId,
      categoryId: this.offer?.category?.categoryId,
      facets: this.offer?.facets
    }
    this.store.dispatch(CreateOfferActions.updateDraftOfferSingle({ offer }))
  }

}
