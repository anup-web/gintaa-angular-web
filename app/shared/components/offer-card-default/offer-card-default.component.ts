import { ChangeDetectorRef, Component, Inject, Input, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { isPlatformBrowser } from '@angular/common';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import localization from '@gintaa/config/localization';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import * as MyOfferActions from '@gintaa/modules/my-offers/store/my-offer.actions';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { defaultNoImage } from '@gintaa/shared/configs/default.config';
import { AuthService } from '@gintaa/core/services/auth.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { Offer } from '@gintaa/shared/models/offer';
import { DeleteDraftOfferPopupComponent } from '../delete-draft-offer-popup/delete-draft-offer-popup.component';

@Component({
  selector: 'app-offer-card-default',
  templateUrl: './offer-card-default.component.html',
  styleUrls: ['./offer-card-default.component.scss']
})
export class OfferCardDefaultComponent implements OnInit, OnDestroy {

  @Input() offer: Offer = null;
  @Input() from: string = null;
  @Input() showOfferStat: boolean = false; /*** THIS IS FOR THE CARD FOOTER OFFER STATISTICS */
  @Input() showFavIcon?: boolean;

  private componentDestroyed$: Subject<void> = new Subject<void>();
  noOfferImage = defaultNoImage;
  pageLoading: boolean = false;
  currentOfferFavoriteStatus: boolean = null;

  constructor(
    private store: Store,
    private sharedService: SharedService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {

    //console.log("----------------------------",this.offer);
    this.subscribeToUtilityState();
    
  }

  checkRoute(){
    if(this.router.url.includes('category')){
      return false;
          }else{
            return true;
       }
  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  isFavorite(id: string) {
    if (!this.isAuth) { return false; }

    if (this.offer) {
      return this.currentOfferFavoriteStatus ?
        this.currentOfferFavoriteStatus
        : this.offer.favourite;
    } else {
      return false;
    }
  }

  addOfferToFavourite(offerId: string) {
    // check login
    if (!this.isAuth) {
      this.openLoginDialog('add-to-fav', offerId);
      return;
    }

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

      if (
        utilityState.errorMessage && utilityState.offerRemovedId === null
        && utilityState.offerAddedToFavoriteId === null
        && utilityState.action === 'OFFER-CARD_DEFAULT'
      ) {
        this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES_FAILURE, 'warning');
        this.store.dispatch(UtilityActions.unsetErrorMessage());
      }

      this._changeDetectorRef.detectChanges();
    })
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }

  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  openLoginDialog(type: string, offerId: string) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
      .afterClosed().subscribe((results) => {
        if (this.isAuth) {
          if (type === 'add-to-fav') {
            this.addOfferToFavourite(offerId);
          } else {
            this.sharedService.showToaster(localization.others.AUTH_FAILED, 'warning');
          }
        }
      });
  }

  navigateToOffer(offer: Offer) {
    if (offer.draftOfferId) {
      const url = offer.auctioned ? 'auction' : offer.offerType.toLowerCase();
      this.router.navigate(
        [`../listing/${url}`],
        { 
          queryParams: { id: offer.draftOfferId }, 
          relativeTo: this.route
        }
      );      
    } else if (this.from == 'matchbox') {
      if (offer.oid) {
        const urloid = this.router.serializeUrl(
          this.router.createUrlTree([`/offer/${offer.oid}`])
        );
        window.open(urloid, '_blank');
      } else {
        const urloid = this.router.serializeUrl(
          this.router.createUrlTree([`/offer/${offer.offerId}`])
        );
        window.open(urloid, '_blank');
      }
    } else {
      this.router.navigate(['/offer/' + offer.offerId]);
    }
  }

  navigateToOfferDetails(offer: Offer) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offer.offerId}`])
    );
    if (offer.draftOfferId) {
      const url = offer.auctioned ? 'auction' : offer.offerType.toLowerCase();
      this.router.navigate(
        [`../listing/${url}`],
        { 
          queryParams: { id: offer.draftOfferId }, 
          relativeTo: this.route
        }
      );
    } else if (offer.oid) {
      const urloid = this.router.serializeUrl(
        this.router.createUrlTree([`/offer/${offer.oid}`])
      );
      window.open(urloid, '_blank');
    } else {
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_blank');
      }
    }
  }

  removeDraftOffer(id: string): void {
    this.store.dispatch(MyOfferActions.removeDraftOffer({ id }))
  }

  openDraftDeleteDialog(id: string): void {
    const dialogConfig: MatDialogConfig = defaultDialogConfig(
      'gintaa-draft-offer-delete-component', true, false, '496px', 'auto')
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = {
      id
    };
    this.matDialog.open(DeleteDraftOfferPopupComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}
