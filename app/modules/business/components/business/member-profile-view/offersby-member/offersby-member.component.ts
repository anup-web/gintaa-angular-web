import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import localization from '@gintaa/config/localization';
import { BusinessActions } from '@gintaa/modules/business/store/action-types';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { BusinessAdminPopupComponent } from '@gintaa/modules/offer/components/offer/business-admin-popup/business-admin-popup.component';
import { Offer } from '@gintaa/shared/models/offer';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { fadeIn, fadeInUp, flash, headShake, pulse, slideInOut, slideInRight, slideInUp, slideUpDown } from 'projects/gintaa/src/app/animation';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-offersby-member',
  templateUrl: './offersby-member.component.html',
  styleUrls: ['./offersby-member.component.scss'],
  animations: [slideInOut, slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class OffersbyMemberComponent implements OnInit {

  @Input() offers: any[];
  defaultImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  currentOfferFavoriteStatus: boolean = null;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  from: string = "";

  constructor(
    public matDialog: MatDialog,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.subscribeToUtilityState();
  }

  openAssignModal(offerId: string, businessId: string) {
    // console.log(businessId);
    // return false;

    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-assign-offer-component';
    dialogConfig.position = {
      top: '20px',
    };

    //dialogConfig.backdropClass = 'mat-dialog-backdrop';
    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      businessId: businessId,
      offerId: offerId
    };

    // const modalDialog = this.matDialog.open(AssignOfferPopupComponent, dialogConfig);
    const modalDialog = this.matDialog.open(BusinessAdminPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      if (results) {
        let offerDeledateStatus = results.offerDeledateStatus;
        if (offerDeledateStatus) {
          // Refresh data
          this.reFetchBusinessOffers();
        }
      }
    });
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {

      // TODO FIX LATER

      if (utilityState.successMessage && utilityState.offerAddedToFavoriteId) {
        if (utilityState.offerAddedToFavoriteId !== '') {
          this.currentOfferFavoriteStatus = true;
          this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES, 'success');
          this.store.dispatch(
            UtilityActions.clearLastSavedFavoriteOfferId()
          );
        }
      }

      if (utilityState.successMessage && utilityState.offerRemovedId) {
        if (utilityState.offerRemovedId !== '') {
          this.currentOfferFavoriteStatus = false;
          this.sharedService.showToaster(localization.offer.REMOVE_OFFER_FAVORITES, 'success');
          this.store.dispatch(
            UtilityActions.clearLastRemovedFavoriteOfferId()
          );
        }
      }

      if (
        utilityState.errorMessage
        && utilityState.offerRemovedId === null
        && utilityState.offerAddedToFavoriteId === null
        && utilityState.action === 'OFFER-CARD_DEFAULT'
      ) {
        this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES_FAILURE, 'warning');
        this.store.dispatch(UtilityActions.unsetErrorMessage());
      }

    });
  }

  isFavorite(offer: any) {
    if (offer) {
      return this.currentOfferFavoriteStatus ?
        this.currentOfferFavoriteStatus
        : offer.favourite;
    } else {
      return false;
    }
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
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
      this.router.navigate(['/offer/' + offer.offerId]);
    }
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

  reFetchBusinessOffers() {
    this.store.dispatch(
      BusinessActions.refetchBusinessOffer()
    )
  }

}
