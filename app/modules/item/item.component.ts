import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { selectOfferError, selectOfferInfo, selectOfferSectionoggles } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { AllDesireTypes, OFFER_DESIRE_TYPE } from '../create-offer/configs/create-offer.config';
import { CreateOfferActions } from '../create-offer/store/action-types';
import { CreateOfferSectionToggles } from '../create-offer/store/models/create-offer';
import { SharedService } from '@gintaa/shared/services/shared.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {

  offer: Offer;
  sectionToggles: CreateOfferSectionToggles;

  constructor(
    private store: Store<gintaaApp.AppState>,
    private _route: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.store.dispatch(CreateOfferActions.clearOfferData());
    const id: string = this._route.snapshot.queryParamMap.get('id');
    const offerCategory: string = this._route.snapshot.queryParamMap.get('category') || 'DRAFT';
    if (id && offerCategory === 'DRAFT') {
      this.store.dispatch(CreateOfferActions.fetchDraftData({ id }));
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'ITEM' }));
    } else if (id && (offerCategory === 'PUBLISHED' || offerCategory === 'CLONE')) {
      this.store.dispatch(CreateOfferActions.fetchPublishedData({ id }))
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'ITEM' }));
    } else {
      this.store.dispatch(CreateOfferActions.resetSectionToggles());
      this.store.dispatch(CreateOfferActions.resetOfferTabs());
    }

    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe(currentOffer => {
      this.offer = currentOffer;
      const selectedFacetsLength = currentOffer.facets && currentOffer.facets.length ? currentOffer.facets.filter(obj => obj.name !== null).length : 0;
      const mandatoryTagsLength = currentOffer.tags && currentOffer.tags.filter(x => x.mandatory).length;
      if (currentOffer.images?.filter(img => img.cover === true).length) {
        if (
          currentOffer.category 
          && currentOffer.location
          && currentOffer.itemCondition
          && currentOffer.description
          && currentOffer.exchangeMode
          && currentOffer.originCountry
          && currentOffer.quantity && currentOffer.unit && currentOffer.unitOfferValuation
        ) {
          /***
           * SH - for business offer we need to check for few more flags
           * "businessOffer" flag will be true
           */
          if (currentOffer.businessOffer) {
            if (
              !currentOffer.dimensions || !currentOffer.dimensions.length
              || !currentOffer.moq || !currentOffer.hsnCode
            ) {
              this.store.dispatch(CreateOfferActions.enableAccordionOne());
              return;
            }

            if (!currentOffer.taxClass && currentOffer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_FREE) {
              this.store.dispatch(CreateOfferActions.enableAccordionOne());
              return;
            }

            // NOW CHECK THE DIMENSIONS ARRAY
            if (
              currentOffer.dimensions[0]?.breadth
              && currentOffer.dimensions[0]?.height
              && currentOffer.dimensions[0]?.length
              && currentOffer.dimensions[0]?.weight
            ) {} else {
              this.store.dispatch(CreateOfferActions.enableAccordionOne());
              return;
            }
          }

          /***
           * SH - for desiretype money, selling price cannot exceed product value
           */
          if (currentOffer.exchangeMode ===  AllDesireTypes.OFFER_DESIRE_MONEY) {
            
            // SELLING PRICE CANNOT BE NULL
            if (!currentOffer.price) {
              this.store.dispatch(CreateOfferActions.disableAccordionTwo());
              return;
            }

            if (+currentOffer.unitOfferValuation >= +currentOffer.price) {
              this.store.dispatch(CreateOfferActions.enableAccordionTwo());
              if (((selectedFacetsLength >= mandatoryTagsLength) && selectedFacetsLength > 0)
                || (mandatoryTagsLength === 0 && selectedFacetsLength > 0)) {
                  this.store.dispatch(CreateOfferActions.enableAccordionThree());                
                if (currentOffer.desire?.desireType === OFFER_DESIRE_TYPE.ANYTHING 
                    || currentOffer.desire?.description) {
                  this.store.dispatch(CreateOfferActions.enablePostOfferSection());
                }
              } else {
                this.store.dispatch(CreateOfferActions.disableAccordionThree());
              }
            } else {
              this.store.dispatch(CreateOfferActions.disableAccordionTwo());
            }
          } else {
            this.store.dispatch(CreateOfferActions.enableAccordionTwo());
            if (
              ((selectedFacetsLength === mandatoryTagsLength) && selectedFacetsLength > 0)
              || (mandatoryTagsLength === 0 && selectedFacetsLength > 0)
            ) {
              this.store.dispatch(CreateOfferActions.enableAccordionThree());
              if (currentOffer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_EXCHANGE) {
                this.store.dispatch(CreateOfferActions.enablePostOfferSection());
              } else {
                if (currentOffer.desire?.desireType === OFFER_DESIRE_TYPE.ANYTHING) {
                  this.store.dispatch(CreateOfferActions.enablePostOfferSection());
                } else if (currentOffer.desire?.description) {
                  this.store.dispatch(CreateOfferActions.enablePostOfferSection());
                }
              }
            } else {
              this.store.dispatch(CreateOfferActions.disableAccordionThree());
            }
          }
        } else {
          this.store.dispatch(CreateOfferActions.enableAccordionOne());
        }
      }
    });

    this.store.pipe(
      select(selectOfferSectionoggles)
    ).subscribe(sectionToggles => {
      this.sectionToggles = { ...sectionToggles };
    });

    this.store.pipe(
      select(selectOfferError)
    ).subscribe(errorMessage => {
      if (errorMessage) {
        this.sharedService.showToaster(errorMessage, 'warning');
        this.store.dispatch(CreateOfferActions.unsetOfferPostFailure());
      }
    });
  }
}
