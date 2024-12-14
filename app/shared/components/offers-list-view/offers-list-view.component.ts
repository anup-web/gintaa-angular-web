import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import localization from '@gintaa/config/localization';
import { AuthService } from '@gintaa/core/services/auth.service';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-offers-list-view',
  templateUrl: './offers-list-view.component.html',
  styleUrls: ['./offers-list-view.component.scss']
})
export class OffersListViewComponent implements OnInit, OnDestroy {
  @Input() offer: Offer = null;
  @Input() from: string = null;
  @Input() showOfferStat: boolean = false;

  private componentDestroyed$: Subject<void> = new Subject<void>();
  currentOfferFavoriteStatus: boolean = null;
  pageLoading: boolean = false;

  constructor(
    private store: Store,
    private sharedService: SharedService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object,
    private _changeDetectorRef: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.subscribeToUtilityState();
  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  navigateToOffer(offer: Offer) {
    if (offer.draftOfferId) {
      this.router.navigate(
        [`../listing/${offer.offerType.toLowerCase()}`], 
        { 
          queryParams: { id: offer.draftOfferId }, 
          relativeTo: this.route
        }
      );
    } else {
      if (this.from === 'myOfferPublished') {
        const url = this.router.serializeUrl(
          this.router.createUrlTree([`/offer/${offer.offerId}`])
        );
        if (isPlatformBrowser(this.platformId)) {
          window.open(url, '_blank');
        }
      }
      this.router.navigate(['/offer/' + offer.offerId]);
    }
  }

  isFavorite(id: string) {
    if (this.offer) {
      return this.currentOfferFavoriteStatus ?
        this.currentOfferFavoriteStatus
        : this.offer.favourite;
    } else {
      return false;
    }
  }

  addOfferToFavourite(offerId: string) {
    this.showLoader();
    this.store.dispatch(
      UtilityActions.addOfferToFavourite({
        offerId
      })
    )
  }

  removeOfferFromFavourite(offerId: string) {
    this.showLoader();
    this.store.dispatch(
      UtilityActions.removeOfferFromFavourite({
        offerId
      })
    );
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {
      if (this.from !== 'matches') {
        this.pageLoading = utilityState.loading;
      }

      if (utilityState.successMessage && utilityState.offerAddedToFavoriteId) {

        if (utilityState.offerAddedToFavoriteId === this.offer.offerId) {
          this.currentOfferFavoriteStatus = true;
          this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES, 'success');
          this.store.dispatch(
            UtilityActions.clearLastSavedFavoriteOfferId()
          );
        }

        if (this.from === 'gridView') {
          // window.location.reload();
        } else if (this.from === 'myOfferPublished') {
          // window.location.reload();
        }
      }

      if (utilityState.successMessage && utilityState.offerRemovedId) {
        if (utilityState.offerRemovedId === this.offer.offerId) {
          this.currentOfferFavoriteStatus = false;
          this.sharedService.showToaster(localization.offer.REMOVE_OFFER_FAVORITES, 'success');
          this.store.dispatch(
            UtilityActions.clearLastRemovedFavoriteOfferId()
          );
        }

        if (this.from === 'gridView') {
          // window.location.reload();
        } else if (this.from === 'myOfferPublished') {
          // window.location.reload();
        }
      }

      if (utilityState.errorMessage
        && utilityState.offerRemovedId === null
        && utilityState.offerAddedToFavoriteId === null
        && utilityState.action === 'OFFER-CARD_DEFAULT'
      ) {
        this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES_FAILURE, 'warning');
        this.store.dispatch(UtilityActions.unsetErrorMessage());
      }

      this._changeDetectorRef.detectChanges();
    })
  }

  

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
