import { Component, Input, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {
  slideInOut, slideUpDown, flash, headShake, slideInUp, pulse,  fadeInUp, fadeIn, slideInRight
} from 'projects/gintaa/src/app/animation';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { SharedService } from '@gintaa/shared/services/shared.service';
import localization from '@gintaa/config/localization';
import { BusinessAdminPopupComponent } from '@gintaa/modules/offer/components/offer/business-admin-popup/business-admin-popup.component';
import { StorageService } from '@gintaa/core/services/storage.service';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-company-offers',
  templateUrl: './company-offers.component.html',
  styleUrls: ['./company-offers.component.scss'],
  animations: [slideInOut,  slideUpDown, flash, headShake, slideInUp, pulse, fadeInUp, fadeIn, slideInRight]
})
export class CompanyOffersComponent implements OnInit {

  @Input() offers: any[];
  defaultImage: string = 'assets/images/create-offer/uplaod-default-img.png';
  currentOfferFavoriteStatus: boolean = null;
  private componentDestroyed$: Subject<void> = new Subject<void>();
  from: string = "";
  allowOfferDelegate: boolean = false;
  allowOfferFavorite: boolean = false;
  allowOfferUnfavorite: boolean = false;

  constructor(
    public matDialog: MatDialog,
    private store: Store,
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private storageService: StorageService,
  ) { }

  ngOnInit(): void {
    const selectedBusiness = this.storageService.getSelectedBusiness();
    if (selectedBusiness) {
      const { businessId, businessRole} = selectedBusiness;
      this.allowOfferDelegate = this.sharedService.allowBusinessAction('OFFER_DELEGATE_ITEM', businessRole);
      this.allowOfferFavorite = this.sharedService.allowBusinessAction('OFFER_ADD_FAVORITE', businessRole);
      this.allowOfferUnfavorite = this.sharedService.allowBusinessAction('OFFER_REMOVE_FAVORITE', businessRole);
    }
    this.subscribeToUtilityState();
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

      if (utilityState.errorMessage && utilityState.offerRemovedId === null && utilityState.offerAddedToFavoriteId === null) {
        this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES_FAILURE, 'warning');
        this.store.dispatch(UtilityActions.unsetErrorMessage());
      }

    });
  }
  
  openAssignModal(offerId: string, businessId: string) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-assign-offer-component';
    dialogConfig.position = {
      top: '20px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = 'auto';
    dialogConfig.data = {
      offerId: offerId,
      businessId: businessId
    };

    const modalDialog = this.matDialog.open(BusinessAdminPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
      // console.log('delegate close results:', results);
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
    if(offer.draftOfferId) {
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

}
