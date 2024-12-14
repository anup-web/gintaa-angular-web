import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as gintaaApp from '@gintaa/store/app.reducer';
import { FavouriteActions } from '@gintaa/modules/my-favorites/store/action-types';
import { selectFavouriteState } from '../../../store/favourite.selector';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-favorites-offers',
  templateUrl: './favorites-offers.component.html',
  styleUrls: ['./favorites-offers.component.scss']
})
export class FavoritesOffersComponent implements OnInit {

  myFavoriteOffers: Offer[] = [];
  offerRemovedId: string = null;
  loading: boolean = false;
  allowApplyEllipsis: boolean = true;
  ellipsisMaxChar: number = 12;

  pageLoading: boolean = false;
  utilityErrorMessage: string = null;
  utilitySuccessMessage: string = null;

  constructor(
    private store: Store<gintaaApp.AppState>
  ) { }

  ngOnInit(): void {
    this.hideLoader();
    this.subscribeToUtilityState();
    this.subscribeToFavouriteOffers();
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).subscribe(utilityState => {
      this.pageLoading = utilityState.loading;

      if (utilityState.errorMessage) {
        this.utilityErrorMessage = utilityState.errorMessage;
      }

      if (utilityState.successMessage) {
        this.utilitySuccessMessage = utilityState.successMessage;
      }

      if (utilityState.successMessage && utilityState.offerRemovedId) {
        this.removeOfferFromFavorite(utilityState.offerRemovedId);
      }
    })
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }
  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  subscribeToFavouriteOffers() {
    this.store.select(selectFavouriteState).subscribe(offers => {
      if (offers && offers.myFavoriteOffers.length > 0) {
        this.myFavoriteOffers = [...offers.myFavoriteOffers];
      } else {
        this.myFavoriteOffers = [];
      }

      this.loading = offers.loading;
    })
  }

  getOfferVertical(offer: Offer) {
    if (offer.category && offer.category.vertical) {
      return this.applyEllipsis(offer.category.vertical.label) + ', ';
    } else {
      return '';
    }
  }

  applyEllipsis(text: string) {
    if (!text || !this.allowApplyEllipsis || text.length <= this.ellipsisMaxChar) {
      return text;
    }

    return text.substring(0, (this.ellipsisMaxChar - 2)) + '..';
  }

  getCategoryLabel(offer: Offer) {
    if (offer.category && offer.category.label) {
      return this.applyEllipsis(offer.category.label);
    } else {
      return this.applyEllipsis(offer.category.type);
    }
  }

  getLocation(offer: Offer) {
    if (offer.location && offer.location.city) {
      return offer.location.city;
    } else {
      return offer.location?.state || null;
    }
  }

  removeFromFavourite(offerId: string) {
    if (offerId) {
      this.showLoader();
      this.store.dispatch(
        UtilityActions.removeOfferFromFavourite({
          offerId
        })
      );
    }
  }

  removeOfferFromFavorite(offerId: string) {
    if (offerId) {
      this.store.dispatch(
        FavouriteActions.removeOfferFromFavoriteByOfferId({ offerId })
      )
    }
  }

  filterFavourites(event: any) {
    const selectedFilter = event.target.value;
    if (selectedFilter) {
      if (selectedFilter === "2") {
        this.myFavoriteOffers.sort(this.compareWithPriceDesc);
      } else if (selectedFilter === "1") {
        this.myFavoriteOffers.sort(this.compareWithPriceAsc);
      } else if (selectedFilter === "3") {
        this.myFavoriteOffers.sort(this.compareWithDateDesc);
      } else if (selectedFilter === "4") {
        this.myFavoriteOffers.sort(this.compareWithDateAsc);
      }
    }
  }

  compareWithPriceDesc( a: Offer, b: Offer ) {
    if ( a.unitOfferValuation < b.unitOfferValuation ) {
      return -1;
    }
    if ( a.unitOfferValuation > b.unitOfferValuation ) {
      return 1;
    }
    return 0;
  }

  compareWithPriceAsc( a: Offer, b: Offer ) {
    if ( a.unitOfferValuation < b.unitOfferValuation ) {
      return 1;
    }
    if ( a.unitOfferValuation > b.unitOfferValuation ) {
      return -1;
    }
    return 0;
  }

  compareWithDateDesc( a: Offer, b: Offer ) {
    if ( a.publishedDate > b.publishedDate ) {
      return -1;
    }
    if ( a.publishedDate < b.publishedDate ) {
      return 1;
    }
    return 0;
  }

  compareWithDateAsc( a: Offer, b: Offer ) {
    if ( a.publishedDate > b.publishedDate ) {
      return 1;
    }
    if ( a.publishedDate < b.publishedDate ) {
      return -1;
    }
    return 0;
  }

}
