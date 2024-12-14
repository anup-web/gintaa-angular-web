import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { CreateOfferActions } from '../create-offer/store/action-types';
import { selectOfferError, selectOfferInfo, selectOfferSectionoggles } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import { CreateOfferSectionToggles } from '../create-offer/store/models/create-offer';
import { SharedService } from '@gintaa/shared/services/shared.service';

@Component({
  selector: 'app-auction',
  templateUrl: './auction.component.html',
  styleUrls: ['./auction.component.scss']
})
export class AuctionComponent implements OnInit {  
  
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
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'AUCTION' }));
    } else if (id && (offerCategory === 'PUBLISHED' || offerCategory === 'CLONE')) {
      this.store.dispatch(CreateOfferActions.fetchPublishedData({ id }))
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'AUCTION' }));
    } else {
      this.store.dispatch(CreateOfferActions.resetSectionToggles());
      this.store.dispatch(CreateOfferActions.resetOfferTabs());
    }

    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe(currentOffer => {
      this.offer = currentOffer;
      if (currentOffer.images?.filter(img => img.cover === true).length) {
        if (
          currentOffer.category
          && currentOffer.location
          && currentOffer.itemCondition
          && currentOffer.description
          && currentOffer.auctionInfo?.basePrice
          // && currentOffer.auctionInfo?.buyOutPrice
          && (currentOffer.auctionInfo?.end || currentOffer.auctionInfo?.endDate)
          && currentOffer.auctionInfo?.stepPrice
          && currentOffer.quantity && currentOffer.unit && currentOffer.unitOfferValuation
        ) {
          /***
           * SH - for business offer we need to check for few more flags
           * "businessOffer" flag will be true
           */
           if (currentOffer.businessOffer) {
            if (!currentOffer.dimensions || !currentOffer.dimensions.length || !currentOffer.taxClass) {
              this.store.dispatch(CreateOfferActions.enableAccordionOne());
            }

            // NOW CHECK THE DIMENSIONS ARRAY
            if (currentOffer.dimensions && currentOffer.dimensions.length) {
              if (
                currentOffer.dimensions[0]?.breadth
                && currentOffer.dimensions[0]?.height
                && currentOffer.dimensions[0]?.length
                && currentOffer.dimensions[0]?.weight
              ) {} else {
                this.store.dispatch(CreateOfferActions.enableAccordionOne());
                return;
              }
            } else {
              this.store.dispatch(CreateOfferActions.enableAccordionOne());
              return;
            }
          }

          if ((!currentOffer.auctionInfo?.buyOutPrice) || (currentOffer.auctionInfo?.buyOutPrice > currentOffer.auctionInfo?.basePrice)) {
            this.store.dispatch(CreateOfferActions.enableAccordionTwo());
            if (currentOffer.facets && currentOffer.facets.length) {
              this.store.dispatch(CreateOfferActions.enablePostOfferSection());
            }
          } else {
            this.store.dispatch(CreateOfferActions.disableAccordionTwo());
          }
        } else {
          this.store.dispatch(CreateOfferActions.enableAccordionOne());
        }
      } else {
        this.store.dispatch(CreateOfferActions.disableAccordionOne());
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
