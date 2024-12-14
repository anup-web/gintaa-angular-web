import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { select, Store } from '@ngrx/store';
import { CreateOfferActions } from '../create-offer/store/action-types';
import { selectOfferError, selectOfferInfo, selectOfferSectionoggles } from '@gintaa/modules/create-offer/store/selectors/create-offer.selectors';
import { Offer } from '@gintaa/shared/models/offer';
import { CreateOfferSectionToggles } from '../create-offer/store/models/create-offer';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { AllDesireTypes } from '../create-offer/configs/create-offer.config';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss']
})
export class ServiceComponent implements OnInit {
  createServiceOfferForm: FormGroup;
  serviceOfferErrors: Object;
  offer: Offer;
  sectionToggles: CreateOfferSectionToggles;

  constructor(
    private fb: FormBuilder,    
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
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'SERVICE' }));
    } else if (id && (offerCategory === 'PUBLISHED' || offerCategory === 'CLONE')) {
      this.store.dispatch(CreateOfferActions.fetchPublishedData({ id }))
      this.store.dispatch(CreateOfferActions.enableOfferTab({ name: 'SERVICE' }));
    } else {
      this.store.dispatch(CreateOfferActions.resetSectionToggles());
      this.store.dispatch(CreateOfferActions.resetOfferTabs());
    }

    this.store.pipe(
      select(selectOfferInfo)
    ).subscribe(currentOffer => {
      this.offer = currentOffer;
      const selectedFacetsLength = currentOffer.facets && currentOffer.facets.length;
      const mandatoryTagsLength = currentOffer.tags && currentOffer.tags.filter(x => x.mandatory).length;
      if (currentOffer.images?.filter(img => img.cover === true).length) {
        if (
          currentOffer.description
          && currentOffer.category
          && currentOffer.rate && currentOffer.duration
        ) {
          /***
           * SH - for business offer we need to check for few more flags
           * "businessOffer" flag will be true
           */
          if (currentOffer.businessOffer && !currentOffer.hsnCode) {
            this.store.dispatch(CreateOfferActions.enableAccordionOne());
            return;
          }

          if (currentOffer.businessOffer && !currentOffer.taxClass && currentOffer.exchangeMode !== AllDesireTypes.OFFER_DESIRE_FREE) {
            this.store.dispatch(CreateOfferActions.enableAccordionOne());
            return;
          }

          if (
            currentOffer.yourLocation
            || (currentOffer.myLocation && currentOffer.location)
            || currentOffer.remote
          ) {
            if (currentOffer.myLocation && !currentOffer.location) {
              // user must have selected at least one location
              this.store.dispatch(CreateOfferActions.disableAccordionTwo());
              return;
            }
            this.store.dispatch(CreateOfferActions.enableAccordionTwo());
            if (
              ((selectedFacetsLength === mandatoryTagsLength) && selectedFacetsLength > 0)
              || (mandatoryTagsLength === 0 && selectedFacetsLength > 0)
            ) {
              this.store.dispatch(CreateOfferActions.enableAccordionThree());
              if (currentOffer.facets) {
                this.store.dispatch(CreateOfferActions.enablePostOfferSection());
              }
            } else {
              this.store.dispatch(CreateOfferActions.disableAccordionThree());
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
