import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import localization from '@gintaa/config/localization';
import { AuthService } from '@gintaa/core/services/auth.service';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { OfferEntityService } from '@gintaa/modules/offer/services/offer-entity.service';
import { defaultOwlOptions } from '@gintaa/shared/configs/ngx-owl-options-config';
import { GridViewConfig } from '@gintaa/shared/models';
import { Offer } from '@gintaa/shared/models/offer';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { Store } from '@ngrx/store';
import { OwlOptions, SlidesOutputData } from 'ngx-owl-carousel-o';
import { noop, Observable, Subject } from 'rxjs';
import { first, map, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-others-offers',
  templateUrl: './others-offers.component.html',
  styleUrls: ['./others-offers.component.scss']
})
export class OthersOffersComponent implements OnInit, OnDestroy {

  @Input('offerId') offerId: string;
  @Input('business') business ?: any;
  otherOfferConfig: GridViewConfig = {
    title: null,
    userId: null,
    actionButton: {
      flag: true,
      label: 'Show All'
    },
    items: []
  };
  private componentDestroyed$: Subject<void> = new Subject<void>();
  favoriteOffer: string[] = [];
  currentOfferId: string;
  activeSlides: SlidesOutputData;
  isShowPrev: boolean;
  isShowNext: boolean;
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions;
  public totalViewedOffer: number = 0;
  public staticBanners: any = [];
  public maxUnSlideItemNumber: number = 5;
  lastViewedOffer$: Observable<Offer[]>;

  public lastViewedStaticBanners: any= {
    title: "",
    dataList: []
  }

  
  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService,
    private _changeDetectorRef: ChangeDetectorRef,
    private sharedService: SharedService,
    private offerService: OfferEntityService,
    private firebseStaticService: FirebaseStaticContentService,
  ) { }

  ngOnInit() {

    console.log('business:', this.business);

    this.getLastViewedOfferBannersData();    
    this.subscribeToUtilityState();
    // console.log('Ofeffefefeffefe iiidididid:::', this.offerId);
    this.offerService.getWithQuery(this.offerId)
    .pipe(
      map(offers => offers.filter(offer => offer.offerId !== this.offerId)),
      tap(res => {
        // console.log('otherOfferConfig:', res)
        this.otherOfferConfig.items.length = 0;
        this.otherOfferConfig.title = res.length ? `${res[0].user.name}` : '';
        this.otherOfferConfig.userId = res.length ? `${res[0].user.identityId}` : '';
        this.otherOfferConfig.items.push(...res);
      //  console.log("=============",this.otherOfferConfig.items.length);
       if(this.otherOfferConfig.items.length <5){
        this.processStaticBanners(this.otherOfferConfig.items.length);
       }
      }),
      first()
    ).subscribe(noop);
    // this.offerShareService.getOwnerByOfferId(offerId);
    this.isShowNext = this.otherOfferConfig.items.length > 5;

    
  }

  async getLastViewedOfferBannersData() {
    this.lastViewedStaticBanners = await this.firebseStaticService.getLastViewedOfferBanners();
    // console.log("this.lastViewedStaticBanners",this.lastViewedStaticBanners); 
 // this.processStaticBanners(this.totalViewedOffer);
  }

  processStaticBanners(totalItem:number) {   
    
    // console.log("=====totalItem",totalItem);
    if(totalItem && totalItem < this.maxUnSlideItemNumber){
      let restBannerToShow: number = this.maxUnSlideItemNumber - totalItem;
      this.staticBanners = this.lastViewedStaticBanners.dataList.slice(0, restBannerToShow);
      // console.log('staticBanners:', this.staticBanners);
    }
  }
  getPassedData(data: SlidesOutputData, totalLength: number) {
    this.activeSlides = data;
    const currentPosition = this.activeSlides.startPosition;
    const totalActiveSildes = this.activeSlides.slides.length;
    this.isShowPrev = currentPosition > 0;
    this.isShowNext = (currentPosition + totalActiveSildes) < totalLength;
  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState).pipe(
      takeUntil(this.componentDestroyed$)
    ).subscribe(utilityState => {

      if (utilityState.successMessage && utilityState.offerAddedToFavoriteId) {

        if (utilityState.offerAddedToFavoriteId === this.currentOfferId) {
          this.favoriteOffer.push(this.currentOfferId);
          this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES, 'success');
          this.store.dispatch(
            UtilityActions.clearLastSavedFavoriteOfferId()
          );
        }
      }

      if (utilityState.successMessage && utilityState.offerRemovedId) {
        if (utilityState.offerRemovedId === this.currentOfferId) {
          this.favoriteOffer = this.favoriteOffer.filter(offer => offer !== this.currentOfferId);
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

      this._changeDetectorRef.detectChanges();
    })
  }

  isFavorite(offer: Offer) {
    if (offer) {
      return this.favoriteOffer.includes(this.currentOfferId) ? true : offer.favourite;
    } else {
      return false;
    }
  }

  addOfferToFavourite(offerId: string) {
    // console.log("=================offerId",offerId);
    //this.currentOfferId = offerId;
    this.showLoader();
    this.store.dispatch(
      UtilityActions.addOfferToFavourite({
        offerId
      })
    )
  }

  removeOfferFromFavourite(offerId: string) {
    this.currentOfferId = offerId;
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

  navigateToOfferList() {
    // businessId
    let queryParams = { 
      oid: this.currentOfferId, 
      userName: this.otherOfferConfig.title 
    }

    // Add for business other listing
    if(this.business && this.business.businessId) {
      queryParams['businessId'] = this.business.businessId
    }

    this.router.navigate(
      [`offer/${this.otherOfferConfig.userId}/offers`], 
      { 
        queryParams: queryParams
      }
    );
  }

  navigateToOfferDetails(id: string) {
    this.router.navigateByUrl(`/offer/${id}`);
  }

  ngOnDestroy(): void {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }

}