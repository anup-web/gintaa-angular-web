import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '@gintaa/core/services/location.service';
import { DealClosePopupComponent } from '@gintaa/modules/deal-new/components/deal/deal-close-popup/deal-close-popup.component';
import { DealDetailsFormat, DealAvailableTabs, DealHistory } from '@gintaa/modules/deal-new/models/deal.model';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { selectDealState, closeStep, loader, selectlastFetchedDealRating} from '@gintaa/modules/deal-new/store/deal.selectors';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { AuthService } from '@gintaa/core/services/auth.service';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import { ChatTypeEnums } from '@gintaa/shared/models';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import Moment from 'moment';
import * as Constants from '@gintaa/config/constant.config';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-close-deal',
  templateUrl: './close-deal.component.html',
  styleUrls: ['./close-deal.component.scss']
})
export class CloseDealComponent implements OnInit, OnDestroy {

  dealStateSubscriber: Subscription;
  closeStepSubscriber: Subscription;
  loaderSubscriber: Subscription;
  dealRatingSubscriber: Subscription;
  dealRefId: string = null;
  allPossibleDealTabs = DealAvailableTabs;
  dealDetails: DealDetailsFormat = null;
  dealHistory: DealHistory = null;
  showInfoSection: boolean = false;
  loader: boolean = true;
  isRateCalled: boolean = false;
  firstLoad: boolean = true;
  userDetails: any = null;
  identityId: string;
  breadcrumb: any = [
    {
      name:'My Deals',
      link:'/deals',
    },
    {
      name:'Accepted',
      link:'/deals',
      click:'accepted',
      dealType:'accepted'
    },
    {
      name:'Accepted Deal',
      link:'',
      dealType:''
    }
  ];
  closeStep: string = '';
  dealRating: any = null;
  userLocation: any = null
  locationcalled: boolean = false;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  isChatNowButtonClicked: boolean = false;
  constructor(
    public matDialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<gintaaApp.AppState>,
    private authService: AuthService,
    private chatService: ChatService,
    private locationService: LocationService,
    private dealService: DealService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.dealRefId = params.get("id");
      if (this.dealRefId) {
        this.fetchDealDetails(this.dealRefId);
        this.fetchDealHistory(this.dealRefId);
        this.identityId = this.authService.getAuthInfo()?.userId;
      }
    });
    this.lastFetchedDealDetailsSubscriber();
  }

  fetchDealDetails(dealRefId: string) {
    this.store.dispatch(
      DealActions.fetchDealDetails({
        dealRefId
      })
    );
  }

  fetchDealHistory(dealRefId: string) {
    this.store.dispatch(
      DealActions.fetchDealHistory({
        dealRefId
      })
    )
  }

  fetchDealSnap(dealRefId: string) {
    this.store.dispatch(
      DealActions.fetchDealSnapshotMock({
        dealRefId
      })
    )
  }

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      this.dealDetails = {
        ...dealDetails.lastFetchedDealDetails
      };
      if(this.firstLoad){
        this.firstLoad = false;
        this.scrollToTop();
      }
      if (this.dealDetails?.dealStatus?.dealStatus == 'CLOSED') {
        this.breadcrumb  = [
          {
            name:'My Deals',
            link:'/deals',
          },
          {
            name:'Closed',
            link:'/deals',
            click:'closed',
            dealType:'closed'
          },
          {
            name:'Closed Deal',
            link:'',
            dealType:''
          }
        ];
      } else if (this.dealDetails?.dealStatus?.dealStatus == 'PARTIAL_CLOSED') {
        this.breadcrumb  = [
          {
            name:'My Deals',
            link:'/deals',
          },
          {
            name:'Partial Closed',
            link:'/deals',
            click:'partial_closed',
            dealType:'partial_closed'
          },
          {
            name:'Partial Closed Deal',
            link:'',
            dealType:''
          }
        ];
      }
      if ( dealDetails.lastFetchedDealHistory ) {
        this.dealHistory = {
          ...dealDetails.lastFetchedDealHistory
        };
      }
      if (this.dealDetails?.receiver) {
        let locationOfferId = '';
        if (this.dealDetails.callerIsReceiver) {
          this.userDetails = this.dealDetails.sender;
          if(this.dealDetails.offeredOffers){
            const offerIds = this.dealDetails.offeredOffers.map((val) => val.offerId);
            locationOfferId = offerIds.join(',');
          }
        } else {
          const offerIds = this.dealDetails.requestedOffers.map((val) => val.offerId);
          locationOfferId = offerIds.join(',');
          this.userDetails = this.dealDetails.receiver;
        }
        if (!this.locationcalled && locationOfferId != '') {
          this.getlLocation(locationOfferId);
        }
      }
    });

    this.closeStepSubscriber = this.store.select(closeStep).subscribe(closeStep => {
      this.closeStep = closeStep != '' ? closeStep : this.closeStep;
    });

    this.loaderSubscriber = this.store.select(loader).subscribe(loaderState => {
      this.loader = loaderState;
    });

    this.dealRatingSubscriber = this.store.select(selectlastFetchedDealRating).subscribe(dealRating => {
      this.dealRating = dealRating;
    });

  }

  scrollToTop() {
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 8));
      }
    })();
  }

  fetchDealRating(dealRefId: string, receiverIdentityId: string, senderIdentityId:string) {
    this.store.dispatch(
      DealActions.fetchDealRating({
        dealRefId,
        receiverIdentityId,
        senderIdentityId
      })
    )
  }
  
  openCloseDialog(type:string = '') {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-report-offer-component' + type;
    dialogConfig.position = { top: '10px', };

    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      dealRefNo: this.dealRefId,
      closeStep: 'optpopup',
      closeDeal: false,
      identityId: this.identityId
    };
    if(type !== ''){
      dialogConfig.data.closeStep = type;
    }
    if(type === 'RATE_USER'){
      dialogConfig.data.closeDeal = true;
    }
    if(type == 'optpopup'){
      this.store.dispatch( DealActions.pageLoading());
      this.store.dispatch( DealActions.resendOtpStart({ dealRefId: this.dealRefId }));
    }

    const modalDialog = this.matDialog.open(DealClosePopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      this.store.dispatch( DealActions.clearDealQuestion());
      // do something with results
      // this.router.navigate([`/deals/accepted/${this.dealRefId}`]);
    });
  }

  infoSection(action:string){
    this.showInfoSection = (action === 'open' ? true : false);
  }

  navigateToOffer(offerId){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  getRatedByUser(){
    return this.dealDetails?.callerIsReceiver ? this.dealDetails?.dealReceiverRating : this.dealDetails?.dealSenderRating;
  }

  getClosedTime(){
    if(this.dealHistory && this.dealHistory['dealRevisions']){
      const length = this.dealHistory['dealRevisions'].length -1;
      const locatDateTime = Moment.utc(this.dealHistory['dealRevisions'][length]['createdDate']).toDate();
      const localDate = Moment(locatDateTime).format('ll');
      const localTime = Moment(locatDateTime).format('h:m a');
      return localTime+ ' '+ localDate;
    } else {
      return '';
    }
  }

  onClickBreadCrumb(data:any){
    let selectedType = Constants.DEAL_FILTER_TYPE_ALL;
    let selectedStatus = Constants.DEAL_STATUS_ALL;
    switch (data.click) {
      case DealAvailableTabs.DEAL_ACCEPTED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_ACCEPTED;
        break;
      case DealAvailableTabs.DEAL_INCOMING:
        selectedType = Constants.DEAL_FILTER_TYPE_INCOMING;
        selectedStatus = Constants.DEAL_STATUS_INITIATED;
        break;
      case DealAvailableTabs.DEAL_OUTGOING:
        selectedType = Constants.DEAL_FILTER_TYPE_SENT;
        selectedStatus = Constants.DEAL_STATUS_INITIATED;
        break;
      case DealAvailableTabs.DEAL_CLOSED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_CLOSED;
        break;
      case DealAvailableTabs.DEAL_REJECTED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_REJECTED;
        break;
      case DealAvailableTabs.DEAL_VIOLATED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_VIOLATED;
        break;
      case DealAvailableTabs.DEAL_REVISED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_REVISED;
        break;
      case DealAvailableTabs.PARTIAL_CLOSED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_P_CLOSED;
        break;
      case DealAvailableTabs.DEAL_ABANDONED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_ABANDONED;
        break;
      case DealAvailableTabs.DEAL_REPORTED:
        selectedType = Constants.DEAL_FILTER_TYPE_ALL;
        selectedStatus = Constants.DEAL_STATUS_REPORTED;
        break;
    }

    this.store.dispatch(
      DealActions.updateCurrentFetch({
        dealType: {
          type: [selectedType],
          status: [selectedStatus]
        }
      })
    )
    this.router.navigate([data.link]);
  }

  chatNow(){
    this.createRoom();
  }

  createRoom() {
    //chat with firestore
    this.isChatNowButtonClicked = true;
    this.chatService.createRoom(this.dealDetails, ChatTypeEnums.deal).subscribe((res: any)=> {
      const response: any = res;
      this.router.navigateByUrl(`chat/${ChatTypeEnums.deal}/${this.dealDetails.dealRefId}/rooms/${response.roomId}/messages`); 
    },(error=>{
      this.isChatNowButtonClicked = false;
    })
    );
  }
  
  getlLocation(offerId: string = '') {
    this.locationcalled = true;
    this.locationService.getPosition().then(res => {
      if (res.lat && res.lng) {
        const currentLocation = {
          _lat: res.lat,
          _lng: res.lng,
        };
        this.dealService.getUserLocation(offerId, currentLocation)
          .subscribe(result => {
            if (result['code'] == 200) {
              this.userLocation = result['payload'] ? result['payload'] : null;
            }
          });
      }
    });
  }

  isLastModifier() {
    if (this.dealDetails.callerIsReceiver) {
      return this.dealDetails.receiver.id == this.dealDetails.triggeredByUserId;
    } else {
      return this.dealDetails.sender.id == this.dealDetails.triggeredByUserId;
    }
  }

  fetchrequestedAmount(deal: DealDetailsFormat) {
    if (deal.requestedAmount > 0) {
      return deal.requestedAmount;
    } else {
      return null;
    }
  }

  ngOnDestroy() {
    this.dealStateSubscriber.unsubscribe();
    this.closeStepSubscriber.unsubscribe();
    this.loaderSubscriber.unsubscribe();
    this.dealRatingSubscriber.unsubscribe();
  }

  isImageArray(offer:any){
    if(offer && offer.images && Array.isArray(offer.images)){
      return true;
    } else {
      return false
    }
  }

}
