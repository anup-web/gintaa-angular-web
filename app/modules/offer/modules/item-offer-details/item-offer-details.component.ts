import { Location } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit,PLATFORM_ID } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FeatureListEnum } from '@gintaa/config/enum.config';
import localization from '@gintaa/config/localization';
import { AuthService } from '@gintaa/core/services/auth.service';
import { FirebaseStaticContentService } from '@gintaa/core/services/firebase-static-content.service';
import { StorageService } from '@gintaa/core/services/storage.service';
import { LoginModalComponent } from '@gintaa/modules/auth/components/login-modal/login-modal.component';
import { AllDesireTypes, OfferExchangeTypes } from '@gintaa/modules/create-offer/configs/create-offer.config';
import { OfferActivityCount } from '@gintaa/modules/home/models/UtilityState.model';
import { UtilityActions } from '@gintaa/modules/home/store/action-types';
import { selectUtilityState } from '@gintaa/modules/home/store/utility.selector';
import { OfferTypes } from '@gintaa/modules/my-offers/configs/my-offer.enum';
import * as MyOffersActions from '@gintaa/modules/my-offers/store/my-offer.actions';
import { AuctionPopupComponent } from '@gintaa/modules/offer/components/offer/auction-popup/auction-popup.component';
import { BusinessAdminPopupComponent } from '@gintaa/modules/offer/components/offer/business-admin-popup/business-admin-popup.component';
import { DeleteOfferPopupComponent } from '@gintaa/modules/offer/components/offer/delete-offer-popup/delete-offer-popup.component';
import { HideOfferPopupComponent } from '@gintaa/modules/offer/components/offer/hide-offer-popup/hide-offer-popup.component';
import { ReportOfferPopupComponent } from '@gintaa/modules/offer/components/offer/report-offer-popup/report-offer-popup.component';
import { availableServiceDays, AVAILBLE_OFFER_STAGE, OFFER_DESIRE_TYPE } from '@gintaa/modules/offer/config/offer.config';
import { FirebaseAnalyticsService } from '@gintaa/core/services/firebase-analytics.service';
import { FirebaseAnalyticsEnum } from '@gintaa/config/enum.config';
import { OfferEntityService } from '@gintaa/modules/offer/services/offer-entity.service';
import { defaultDialogConfig } from '@gintaa/shared/configs/default-dialog.config';
import { ChatTypeEnums, UploadResponse, UserOnlineStatus } from '@gintaa/shared/models';
import { GridViewConfig } from '@gintaa/shared/models/grid-view';
import { Offer, ServiceDays } from '@gintaa/shared/models/offer';
import { OfferShareService } from '@gintaa/shared/services';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { SharedService } from '@gintaa/shared/services/shared.service';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { Store } from '@ngrx/store';
import * as FileSaver from 'file-saver';
import moment from 'moment';
import { interval, noop, Observable, Subject, Subscription } from 'rxjs';
import { filter, first, map, takeUntil, tap } from 'rxjs/operators';
import { SocialLinkDialogsComponent } from '../social-link-dialogs/social-link-dialogs.component';
import { A } from '@angular/cdk/keycodes';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-item-offer-details',
  templateUrl: './item-offer-details.component.html',
  styleUrls: ['./item-offer-details.component.scss'],
})

export class ItemOfferDetailsComponent implements OnInit, OnDestroy {

  private componentDestroyed$: Subject<void> = new Subject<void>();
  bids: any = [];
  dealdetails: any = [];
  cdHours: any;
  cdMins: any;
  cdSecs: any;
  cdDays: any;
  auctionClosed: boolean = false;
  latestAcceptedBidPrice: any;
  timeDifference: any;
  currentBiddingPriceInput: any = 200;
  offerId: string = null;
  selectedOfferDetail: Offer;
  availableDays: ServiceDays[] = availableServiceDays;
  currentOfferStage = AVAILBLE_OFFER_STAGE;
  desireType = OFFER_DESIRE_TYPE;  
  title: string;
  potentialMatchesConfig: GridViewConfig = {
    title: `Potential matches with this listing `,
    actionButton: {
      flag: true,
      label: 'Show All'
    },
    items: []
  };
  roomId: any;
  currentOfferFavouriteCount: number = 0;
  currentOfferActivityCounts: OfferActivityCount;
  successMessage: string = null;
  errorMessage: string = null;

  pageLoading: boolean = false;
  utilityErrorMessage: string = null;
  utilitySuccessMessage: string = null;
  isReadMore: boolean;
  isEnableSuggestDeal: boolean = false;
  showBusinessCard: boolean = true;
  currentOfferFavoriteStatus: boolean = null;
  isOfferReported: boolean = false;
  isAuctionUser: any;
  disableBid: boolean;
  bidSubscription: Subscription;
  isDealInitiated: boolean = false;
  breadcrumb: any[] = [];
  isOpened = false;


  bredCrumbInput = [
    {
      name: 'Listing',
      link: '/my-listings',
      show: true,
      click: true,
    },
    {
      name: OfferTypes.Published,
      show: true,
      click: false,
    },
    {
      name: null,
      show: true,
      click: false,
    }
  ];

  isBusinessOffer: boolean = false;
  businessInfo: any;
  allowOfferDelegate: boolean = false;
  userStatus$: Observable<any>;

  medias: UploadResponse[];
  quantity : number;

  releaseOffer: boolean = false; // offer = deal
  isChatNowButtonClicked: boolean = false;
  offerSeoId: string;
 
  offerFacets: any[];

  constructor(
    private offerService: OfferEntityService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private _location: Location,
    private offerShareService: OfferShareService,
    private dialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private chatService: ChatService,
    public matDialog: MatDialog,
    private sharedService: SharedService,
    private storageService: StorageService,
    private firestore: AngularFirestore,
    private functions: AngularFireFunctions,
    private staticContent: FirebaseStaticContentService,
    private analyticsService: FirebaseAnalyticsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  val:boolean

  ngOnInit(): void {
    this.itemDetails();
    this.hideLoader();
    this.subscribeToUtilityState();
    const type = this.route.snapshot.paramMap.get("type");
    this.route.paramMap.subscribe((params: Params) => {
    this.offerSeoId = type === 'share'? params.get('id'): '';
    this.offerId = type === 'share'? '' : params.get('id');
    this.offerService.entities$
      .pipe(takeUntil(this.componentDestroyed$))
      .subscribe(
        (offers: Offer[]) => {
          
          this.selectedOfferDetail = type === 'share' ?
            offers.find(offer => offer.seOId === this.offerSeoId)
            : offers.length && offers.find(offer => offer.offerId === this.offerId);
          this.offerId = this.selectedOfferDetail?.offerId;  
          if (this.selectedOfferDetail) {
            console.log("=======this.selectedOfferDetail",this.selectedOfferDetail);
            this.getBreadcumbObj(this.spliceBreadcumbObj(this.selectedOfferDetail?.category?.breadcrumbs) ,this.selectedOfferDetail?.currentUserOfferOwner);
            this.getTitleMsg();
            const images: UploadResponse[] = this.selectedOfferDetail.images.length && this.selectedOfferDetail.images.map(image => ({ ...image, type: 'image' })) || [];
            const videos: UploadResponse[] = this.selectedOfferDetail.videos.length && this.selectedOfferDetail.videos.map(video => ({ ...video, type: 'video' })) || [];
            const coverImage = images.length && images.find(image => image.cover === true);
            const otherImages: any[] = images.length && images.filter(image => image.cover !== true);
            this.medias = [coverImage, ...otherImages, ...videos];
            this.quantity = this.selectedOfferDetail?.quantity
            // this.galleryImages = this.selectedOfferDetail ? customGallerySlider([coverImage, ...otherImages]) : [];
            this.bredCrumbInput[1].name = this.selectedOfferDetail ? this.selectedOfferDetail.offerStage : OfferTypes.Published;
            this.bredCrumbInput[2].name = this.selectedOfferDetail ? this.selectedOfferDetail.name : null;
            this.isMyOffer();
            this.fetchFavouriteCount(this.offerId);
            this.isBusinessOffer = this.selectedOfferDetail.businessOffer;
            this.businessInfo = this.selectedOfferDetail.business;

            const selectedBusiness = this.storageService.getSelectedBusiness();
            if (selectedBusiness) {
              const { businessId, businessRole } = selectedBusiness;
              if (businessId === this.businessInfo?.businessId) {
                this.allowOfferDelegate = this.sharedService.allowBusinessAction('OFFER_DELEGATE_ITEM', businessRole);
              }
            }
            // if(type === 'share')
            this.offerShareService.setMetaTags(this.selectedOfferDetail);
            // this.selectedOfferDetail.facets = 
            this.removePriceFromFacets(this.selectedOfferDetail.facets);

          }
          if (this.selectedOfferDetail?.auctioned) {
            interval(1000)
              .pipe(takeUntil(this.componentDestroyed$))
              .subscribe(x => { this.getTimeDifference(); });
            // this.currentBiddingPriceInput = this.selectedOfferDetail?.auctionInfo?.basePrice + this.selectedOfferDetail?.auctionInfo?.stepPrice;
            this.currentBiddingPriceInput = this.selectedOfferDetail?.auctionInfo?.basePrice;

            this.bidSubscription = this.firestore.collection('auctions').doc(this.selectedOfferDetail.offerId).collection('bids').snapshotChanges().subscribe(data => {
              if (data) {
                this.bids = data.map(e => {
                  const b = e.payload.doc.data() as any;
                  const bidtime = { bidTime: moment(e.payload.doc.data().bidTime.toDate()).format() };
                  return { ...b, ...bidtime };
                });
              }
              if (this.bids.length > 0) {
                this.bids = this.bids.sort(function (a, b) {
                  return b.bidPrice - a.bidPrice;
                })
                this.updateChanges();
                this.checkAuctionUser();
              }
            });
          }
          
        }
      )    
    });
    if (this.selectedOfferDetail) {
      this.userStatus$ = this.chatService
        .getOfflineOnlineStatus(this.selectedOfferDetail.user.identityId)
        .pipe
        (
          map((statusRes) => statusRes?.state || UserOnlineStatus.offline)
        );
    }
    this.isReleaseFeature();
  }


  removePriceFromFacets(facets: any[]) {
    let facetsList : any[] = [];
    facets.map((facet) => {      
      if (!facet.name.toLowerCase().includes('price')) {
        facetsList.push(facet); 
      }
    });
    this.offerFacets = facetsList;
  }

  async isReleaseFeature() {
    this.releaseOffer = await this.staticContent.isFeatureRelease(FeatureListEnum.offer);
  }

  naviagteToOfferDetail(id: string) {
    this.router.navigateByUrl(`/offer/${id}`);
  }

  suggestDeal(id: string) {
    if(this.selectedOfferDetail?.businessOffer && this.selectedOfferDetail?.ecommerceFlow && this.selectedOfferDetail?.offerType == 'Item'){
      this.router.navigateByUrl(`/deals/buy-now/${id}`);
    } else {
      this.router.navigateByUrl(`/deals/suggest/${id}`);
    }
  }

  openSocialShareDialog() {
    this.dialog.open(SocialLinkDialogsComponent, {
      width: '500px',
      data: {
        offerDetails: this.selectedOfferDetail
      }
    }).afterClosed().subscribe(noop);
  }

  fetchFavouriteCount(offerId: string) {
    this.store.dispatch(
      UtilityActions.clearMessages()
    );

    this.store.dispatch(
      UtilityActions.getFavouriteOfferCount({
        offerId
      })
    )
  }

  subscribeToUtilityState() {
    this.store.select(selectUtilityState)
      .subscribe(utilityState => {
        this.pageLoading = utilityState.loading;
        this.currentOfferFavouriteCount = utilityState.currentOfferFavouriteCount;
        this.currentOfferActivityCounts = utilityState.currentOfferActivityCounts;
        if (utilityState.errorMessage) {
          this.utilityErrorMessage = utilityState.errorMessage;
        }

        if (utilityState.successMessage) {
          this.utilitySuccessMessage = utilityState.successMessage;
        }

        if (utilityState.successMessage && (utilityState.offerAddedToFavoriteId || utilityState.offerRemovedId)) {

          if (utilityState.offerAddedToFavoriteId) {
            this.currentOfferFavoriteStatus = true;
            this.sharedService.showToaster(localization.offer.ADD_OFFER_FAVORITES, 'success');
            this.store.dispatch(
              UtilityActions.clearLastSavedFavoriteOfferId()
            );
          }

          if (utilityState.offerRemovedId) {
            this.currentOfferFavoriteStatus = false;
            this.sharedService.showToaster(localization.offer.REMOVE_OFFER_FAVORITES, 'success');
            this.store.dispatch(
              UtilityActions.clearLastRemovedFavoriteOfferId()
            );
          }

          // this.fetchFavouriteCount(this.offerId);
          this.offerService.entities$.pipe(
            map(entities => entities.map(entity => ({
              ...entity,
              favourite: !this.selectedOfferDetail.favourite
            })))
          )
        }
      })
  }

  showLoader() {
    this.store.dispatch(UtilityActions.pageLoading())
  }
  hideLoader() {
    this.store.dispatch(UtilityActions.pageLoaded())
  }

  toggleFavourite(offerId: string) {
    // this.showLoader();

    this.store.dispatch(
      UtilityActions.clearMessages()
    );

    if (!this.isCurrentOfferFavourite()) {
      this.addOfferToFavourite(offerId);
    } else {
      this.removeOfferFromFavourite(offerId);
    }
  }

  isCurrentOfferFavourite(offerId: string = null) {
    if (this.selectedOfferDetail) {
      return this.currentOfferFavoriteStatus ?
        this.currentOfferFavoriteStatus
        : this.selectedOfferDetail.favourite;
    } else {
      return false;
    }
  }

  addOfferToFavourite(offerId: string) {
    this.store.dispatch(
      UtilityActions.addOfferToFavourite({
        offerId
      })
    )
  }

  removeOfferFromFavourite(offerId: string) {
    this.store.dispatch(
      UtilityActions.removeOfferFromFavourite({
        offerId
      })
    );
  }

  get descriptions() {
    let description: string = null;
    if (this.selectedOfferDetail) {
      description = this.selectedOfferDetail.description.length > 300 ?
        this.selectedOfferDetail.description.slice(0, 300) : this.selectedOfferDetail.description;
      if (this.isReadMore) {
        description = this.selectedOfferDetail && this.selectedOfferDetail.description;
      }
    }
    return description;
  }

  get discount() {
    let discount: number = 0;
      if (this.selectedOfferDetail && this.selectedOfferDetail.exchangeMode === AllDesireTypes.OFFER_DESIRE_MONEY) {
        discount = ((+this.selectedOfferDetail.unitOfferValuation - +this.selectedOfferDetail.price) * 100) / +this.selectedOfferDetail.unitOfferValuation;
      } 
    return discount;
  }

  get isAuth(): boolean {
    return this.authService.isAuthenticated();
  }

  get isService(): boolean {
    return this.selectedOfferDetail && this.selectedOfferDetail.offerType === 'Service';
  }

  get isItem(): boolean {
    return this.selectedOfferDetail && this.selectedOfferDetail.offerType === 'Item';
  }

  deleteOffer(offerId: string) {
    if (offerId) {
      this.offerShareService.removeOfferByOfferId(offerId).subscribe((result) => {
        // BEFORE
        this.store.dispatch(MyOffersActions.removeOfferByOfferId({ offerId, offerType: "Published" }))
        this.router.navigateByUrl(`/my-listings`);
      });
    }
  }

  hideUnhideOffer(event: any, offerId: string, isHidden: boolean) {
    event.preventDefault();
    if (isHidden) {
      this.offerShareService.unhideOfferDetailsByOfferId(offerId).subscribe((result) => {
        this.router.navigate(['/my-listings'], { fragment: OfferTypes.Published });
      });
    } else {
      this.offerShareService.hideOfferDetailsByOfferId(offerId).subscribe((result) => {
        this.store.dispatch(MyOffersActions.removeOfferByOfferId({ offerId, offerType: "Published" }))
        this.router.navigate(['/my-listings'], { fragment: OfferTypes.Hidden });
      });
    }
  }

  unhideOffer(offerId: string) {
    this.offerShareService.unhideOfferDetailsByOfferId(offerId);
  }

  chatNow() {
    this.createRoom();
  }

  createRoom() {
    // chat with api
    // this.chatService.createRoom(this.selectedOfferDetail.offerId).subscribe((res: any)=> {
    //   const response: any = res.payload;
    //   this.router.navigateByUrl(`chat/offers/${response.offerId}/rooms/${response.roomId}/messages`); 
    // },(error)=>{
    //   console.log({message:error});
    // });

    //chat with firestore
    if (!this.isOfferOwner) {
      this.isChatNowButtonClicked = true;
      this.chatService.createRoom(this.selectedOfferDetail, ChatTypeEnums.offer).subscribe((res: any) => {
        const response: any = res;
        this.router.navigateByUrl(`chat/${ChatTypeEnums.offer}/${this.selectedOfferDetail.offerId}/rooms/${response.roomId}/messages`);
      }, (error => {
        this.isChatNowButtonClicked = false;
      })
      );
    }
  }



  openAuctionDialog() {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-auction-component', true, true, '480px', 'auto');
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = {};
    this.matDialog.open(AuctionPopupComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  openAdminDialog() {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-login-component';
    dialogConfig.position = {
      top: '10px',
    };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      role: 'ADMIN',
      businessId: this.businessInfo.businessId,
      offerId: this.selectedOfferDetail.offerId
    };
    this.matDialog.open(BusinessAdminPopupComponent, dialogConfig)
    .afterClosed().subscribe(noop);
  }

  isMyOffer() {
    const currentUser = this.authService.getSignInInput();
    this.isEnableSuggestDeal = (this.selectedOfferDetail?.user && this.selectedOfferDetail?.user?.identityId && currentUser?.userId && (this.selectedOfferDetail?.user?.identityId === currentUser?.userId)) ? false : true;
    if (this.isEnableSuggestDeal) {
      this.bredCrumbInput[0].name = 'Listing';
      this.bredCrumbInput[0].link = null;
      this.bredCrumbInput[0].click = false;
    } else {
      //this.bredCrumbInput[0].name = 'My Offer';
      this.bredCrumbInput[0].name = 'Listing';
      this.bredCrumbInput[0].link = '/my-listings';
    }
  }

  checkDayPresent(day: string) {
    const checkServiceTimingDay = obj => obj.dayOfWeek.toLowerCase() === day;
    return this.selectedOfferDetail.serviceTimingInfos.length &&
      this.selectedOfferDetail.serviceTimingInfos.some(checkServiceTimingDay);
  }

  previewDocument(doc: any) {
    console.log('document:', doc)
    this.offerShareService.previewOfferDocument(doc)
      .subscribe(results => {
        FileSaver.saveAs(results, doc.orgName);
      });
  }

  openLoginDialog() {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-login-component', true, false, 'auto', '906px');
    dialogConfig.position = {
      top: '20px',
    };
    dialogConfig.data = {};
    this.matDialog.open(LoginModalComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  openHideDialog(offer: Offer) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig(
      'gintaa-offer-detail-component', true, false, '400px', 'auto')
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = {
      offer
    };

    this.matDialog.open(HideOfferPopupComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  openDeleteDialog(offer: Offer) {
    const dialogConfig: MatDialogConfig = defaultDialogConfig(
      'gintaa-offer-detail-component', true, false, '400px', 'auto')

    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = {
      offer
    };

    this.matDialog.open(DeleteOfferPopupComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  getCurrentUserId() {
    return this.authService.currentUserId;
  }

  get isPublishedOffer(): boolean {
    return this.selectedOfferDetail.offerStage.toLowerCase()
      === this.currentOfferStage.PUBLISHED.toLowerCase();
  }

  get isReviewOffer(): boolean {
    return this.selectedOfferDetail.offerStage.toLowerCase()
      === this.currentOfferStage.UNDER_REVIEW.toLowerCase();
  }

  get isNewOffer(): boolean {
    return this.selectedOfferDetail.offerStage.toLowerCase() === this.currentOfferStage.NEW.toLowerCase();
  }

 
  get isDesireType(): string {
    return this.selectedOfferDetail.desire && this.selectedOfferDetail.desire.desireType.toLowerCase();
  }

  get isHiddenOffer(): boolean {
    return this.selectedOfferDetail.hidden;
  }

  get isOfferOwner(): boolean {
    return this.selectedOfferDetail.user.identityId === (this.authService.getAuthInfo() && this.authService.getAuthInfo()?.userId);
  }


  navigateToOtherProfile() {
    if (this.authService.isAuthenticated()) {
      this.router.navigate([`/profile/${this.selectedOfferDetail?.user?.identityId}/view`], { queryParams: { oid: this.offerId, userName: this.selectedOfferDetail.user?.name } })
    }
  }

  updateChanges() {
    let stepPrice = this.selectedOfferDetail?.auctionInfo?.stepPrice;
    const currentUser = this.authService.getSignInInput();
    if (this.bids[0] && this.bids[0]?.userId === currentUser?.userId) {
      this.disableBid = true;
    } else {
      this.disableBid = false;
    }

    if (this.bids[0] && (this.bids[0].bidPrice + stepPrice) <= this.selectedOfferDetail.auctionInfo.buyOutPrice) {
      this.currentBiddingPriceInput = parseInt(this.bids[0].bidPrice) + parseInt(this.selectedOfferDetail?.auctionInfo?.stepPrice);
    } else if (this.bids[0] && (this.bids[0].bidPrice + stepPrice) >= this.selectedOfferDetail.auctionInfo.buyOutPrice) {
      this.currentBiddingPriceInput = this.selectedOfferDetail.auctionInfo?.buyOutPrice;
    } else {
      this.currentBiddingPriceInput = this.bids[0].bidPrice;
    }
    this.latestAcceptedBidPrice = this.bids[0].bidPrice;

  }

  isBidDownEnable() {
    if(((this.currentBiddingPriceInput !== (this.latestAcceptedBidPrice + this.selectedOfferDetail.auctionInfo.stepPrice)) && this.checkLatestPriceLess()) && this.currentBiddingPriceInput !== this.selectedOfferDetail.auctionInfo.basePrice + this.selectedOfferDetail.auctionInfo.stepPrice) {
      return true;
    } else {
      return false;
    }
  }

  setCurrentBiddingPriceInput() {
    if (this.bids && this.bids[this.bids.length - 1].bidPrice > this.currentBiddingPriceInput) {
      this.currentBiddingPriceInput = this.bids[this.bids.length - 1].bidPrice;
    }

  }

  addBidStepToCurrent() {
    if ((this.currentBiddingPriceInput + this.selectedOfferDetail.auctionInfo.stepPrice) <= this.selectedOfferDetail.auctionInfo.buyOutPrice) {
      this.currentBiddingPriceInput += this.selectedOfferDetail.auctionInfo.stepPrice;
    } else if (this.currentBiddingPriceInput < this.selectedOfferDetail.auctionInfo.buyOutPrice && (this.currentBiddingPriceInput + this.selectedOfferDetail.auctionInfo.stepPrice) > this.selectedOfferDetail.auctionInfo.buyOutPrice) {
      this.currentBiddingPriceInput = this.selectedOfferDetail.auctionInfo.buyOutPrice;
    }
  }

  subtractBidStepToCurrent() {
    let stepPrice = this.selectedOfferDetail.auctionInfo?.stepPrice;
    let buyOutPrice = this.selectedOfferDetail.auctionInfo?.buyOutPrice;
    let basePrice = this.selectedOfferDetail.auctionInfo?.basePrice;

    if (!this.latestAcceptedBidPrice && this.currentBiddingPriceInput < buyOutPrice) {
      if ((this.currentBiddingPriceInput > (basePrice + stepPrice)) && this.currentBiddingPriceInput < buyOutPrice) {
        this.currentBiddingPriceInput -= stepPrice;
      } else if ((this.currentBiddingPriceInput - stepPrice) >= (basePrice + stepPrice)) {
        this.currentBiddingPriceInput -= stepPrice;
      } else if (this.currentBiddingPriceInput > (basePrice + stepPrice)) {
        this.currentBiddingPriceInput -= stepPrice;
      }
    } else if (this.latestAcceptedBidPrice && this.currentBiddingPriceInput < buyOutPrice) {
      if ((this.currentBiddingPriceInput - stepPrice) > this.latestAcceptedBidPrice) {
        this.currentBiddingPriceInput -= stepPrice;
      }

    }
    else if (this.currentBiddingPriceInput === this.selectedOfferDetail.auctionInfo?.buyOutPrice) {
      if (((basePrice + (Math.floor((buyOutPrice - basePrice) / stepPrice)) * stepPrice) === buyOutPrice) && (this.currentBiddingPriceInput - stepPrice) > (this.latestAcceptedBidPrice ? this.latestAcceptedBidPrice : 0)) {
        this.currentBiddingPriceInput = basePrice + (Math.floor((buyOutPrice - basePrice) / stepPrice) - 1) * stepPrice;
      }
      else if (basePrice + (Math.floor((buyOutPrice - basePrice) / stepPrice)) * stepPrice > (this.latestAcceptedBidPrice ? this.latestAcceptedBidPrice : 0)) {
        this.currentBiddingPriceInput = basePrice + (Math.floor((buyOutPrice - basePrice) / stepPrice)) * stepPrice
      }
    }
  }

  submitBid() {
    //var functions = firebase.app().functions('asia-south1');

    this.pageLoading = true;
    const callable = this.functions.httpsCallable('bidAuction');
    if (this.currentBiddingPriceInput === this.selectedOfferDetail.auctionInfo.buyOutPrice) {
      this.openBuyoutConfirmPopup()
    }
    //[Broteen] Created an Observable 
    else {
      const obs = callable({ offerId: this.selectedOfferDetail.offerId, bidPrice: this.currentBiddingPriceInput });

      obs.subscribe(res => {
        if (res === 'success') {
          this.pageLoading = false;
        }else{
          this.pageLoading = false;
        }
      });
    }
  }

  toggleAuctionBuyOut(event: MatSlideToggleChange) {
    if (event.checked) {
      this.currentBiddingPriceInput = this.selectedOfferDetail.auctionInfo.buyOutPrice;
    }

  }

  private getTimeDifference() {
    this.timeDifference = moment.duration(moment(this.selectedOfferDetail?.auctionInfo?.end).endOf('day').diff(moment()));
    if (this.timeDifference < 0) {
      this.auctionClosed = true;
    }
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference) {
    this.cdHours = timeDifference.hours();
    this.cdMins = timeDifference.minutes();
    this.cdSecs = timeDifference.seconds()
    this.cdDays = timeDifference.days()
  }

  navigateToMyDeals() {
    this.router.navigate(['/deals']);
  }

  openBuyoutConfirmPopup() {
    const dialogConfig: MatDialogConfig = defaultDialogConfig('gintaa-auction-component', true, true, '400px', 'auto');
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.data = { offerId: this.selectedOfferDetail?.offerId, buyoutPrice: this.selectedOfferDetail?.auctionInfo?.buyOutPrice };
    this.matDialog.open(AuctionPopupComponent, dialogConfig)
      .afterClosed().subscribe(noop);
  }

  checkAuctionComplete() {
    return (this.latestAcceptedBidPrice === this.selectedOfferDetail.auctionInfo?.buyOutPrice) || (this.timeDifference ? this.timeDifference < 0 : true);
  }

  checkAuctionUser() {
    const currentUser = this.authService.getSignInInput();
    if (this.bids[0]) {
      this.isAuctionUser = (currentUser?.userId === this.bids[0]?.userId);
    }
  }

  reportOffer() {
    if (this.authService.isAuthenticated()) {
      const dialogConfig: MatDialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.id = 'gintaa-offer-report-component';
      dialogConfig.position = { top: '10px', };

      dialogConfig.height = 'auto';
      dialogConfig.width = '400px';
      dialogConfig.data = {
        offerId: this.offerId,
      };

      const modalDialog = this.matDialog.open(ReportOfferPopupComponent, dialogConfig);
      modalDialog.afterClosed().subscribe((results) => {
        if (results === 'success') {
          this.sharedService.showToaster(localization.offer.OFFER_REPORTED_SUCCESS, 'success');
          this.isOfferReported = true;
        }
        // do something with results
      });
    } else {
      this.authService.unAuthorisedAction.next('openLogin');
      this.storageService.storeData('reportOfferButton', 'true');
    }
  }

  checkLatestPriceLess() {
    let price = ((this.latestAcceptedBidPrice + this.selectedOfferDetail.auctionInfo.stepPrice) < this.selectedOfferDetail.auctionInfo.buyOutPrice) ;    
    return this.latestAcceptedBidPrice && this.latestAcceptedBidPrice != undefined ? ((this.latestAcceptedBidPrice + this.selectedOfferDetail.auctionInfo.stepPrice) < this.selectedOfferDetail.auctionInfo.buyOutPrice) : true;
  }

  ngOnDestroy() {
    this.componentDestroyed$.next();
    this.componentDestroyed$.complete();
  }
  checkIsOfferInitiated(status = false) {
    this.isDealInitiated = status;
  }

   itemDetails() {
    let eventName = FirebaseAnalyticsEnum.productDetails
    this.analyticsService.logEvents(eventName);
  }

  getBreadcumbObj(BreadcumObj:any ,currentUserOfferOwner:boolean){

    if(currentUserOfferOwner){
      this.breadcrumb =  [{
        name: 'Listing',
        link: '/my-listings',
        show: true,
        click: false,
      },
      {
        name: OfferTypes.Published,
        show: true,
        click: false,
      },
      {
        name: this.selectedOfferDetail?.name,
        show: true,
        click: false,
      }]
    }else{
     // BreadcumObj
    //  if(BreadcumObj.length > 3){
    //   return BreadcumObj.slice(0,BreadcumObj.length-3)
    //  }else{

    //  }

     //this.staticBanners = this.lastViewedStaticBanners.dataList.slice(0, restBannerToShow);

    const breadcumArray = []

    for (var i = 0; i < BreadcumObj.length; i++) {
      breadcumArray.push({
          name: BreadcumObj[i],
          link :'/category?searchText='+BreadcumObj[i]+'',
          show: true,
          click: true
      });
  }

  
  breadcumArray[breadcumArray.length-1].link = "";
  breadcumArray[breadcumArray.length-1].click = false;
  this.breadcrumb = breadcumArray;
  }
  }

  navigateToDealDetails(data: any) {
    if(data?.directBuy){
        this.router.navigate([`/deals/order-details/${data.dealId}`]);
    } else {
        const dealType = data.dealType?.toLowerCase()
        if (dealType === 'initiated' || dealType === 'accepted' || dealType === 'closed' || dealType === 'partial_closed' || dealType === 'rejected' || dealType === 'revised' || dealType === 'abandoned' || dealType === 'reported') {
            this.router.navigate([`/deals/details/${data.dealId}`]);
        }
    }
  }

  getTitleMsg(){
    if(this.selectedOfferDetail?.hidden){
      this.title = "Unhide list"
    }else{
      this.title = "Hide list"
    }
  }

  getFacetVal(factValname){
    if(factValname.toLowerCase().includes('price')){ 
      return false;
    } else {
      return true;
    }

  }

  checkPercentage(discount:number){
    if(Math.round(discount) === 0){
      return false
    }else{
      return true;
    }
    
  }
  spliceBreadcumbObj(breadcrumbArray : any){
    if(breadcrumbArray.length > 4){
      const spliceObj = breadcrumbArray.slice(breadcrumbArray.length-3,breadcrumbArray.length);
      return spliceObj;
    }else{
      return breadcrumbArray;
    }

}

checkBuyOutValue(buyOutValue:number){

  if(buyOutValue === null || buyOutValue === 0){
    return false;
  }else{
    return true;
  }

}

getBusinessUrlBySlug(businessSlug: string) {
  let currentDomain = "www.gintaa.com"
  if (isPlatformBrowser(this.platformId)) {
    currentDomain = window.location.origin
  }
  let businessUrlPrefix = currentDomain + '/business/'+businessSlug;
 // console.log("businessUrlPrefix",businessUrlPrefix);
  return businessUrlPrefix;
}

onClickBreadCrumb(data:any){
  // console.log("Data",data);
}
}
