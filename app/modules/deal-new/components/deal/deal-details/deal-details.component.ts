import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AuthService } from '@gintaa/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { ChatService } from '@gintaa/shared/services/chat.service-firestore';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { ConfirmationBoxComponent } from '@gintaa/shared/components/confirmation-box/confirmation-box.component';
import { DealHistory, DealDetailsFormat, DealAvailableTabs } from '@gintaa/modules/deal-new/models/deal.model';
import { navigateTodealList, loader, selectDealState, dealErrorSelector } from '@gintaa/modules/deal-new/store/deal.selectors';
import { isPlatformBrowser } from '@angular/common';

import { ChatMessageTypeEnums, ChatTypeEnums } from '@gintaa/shared/models';
import * as Constants from '@gintaa/config/constant.config';
import { DealClosePopupComponent } from '../deal-close-popup/deal-close-popup.component';
import localization from '@gintaa/config/localization';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { environment } from '@gintaa/env';
import { ChatAttachImageComponent } from '@gintaa/modules/chat/components/chat/chat-bottom/chat-attach-image/chat-attach-image.component';

declare var Razorpay: any;
@Component({
  selector: 'app-deal-details',
  templateUrl: './deal-details.component.html',
  styleUrls: ['./deal-details.component.scss']
})
export class DealDetailsComponent implements OnInit {

  dealStateSubscriber: Subscription;
  deliverySubscriber: Subscription;
  dealReloadSubscriber: Subscription;
  chatStateSubscriber: Subscription;
  locationSubscriber: Subscription;
  chatSubscriber: Subscription;
  currentDealId: string = null;
  dealDetails: DealDetailsFormat = null;
  dealHistory: DealHistory = null;
  breadcrumb: any = [{
    name: 'My offers',
    link: '/deals',
  }];
  loader: boolean = true;
  errorMessage: string = null;
  userDetails: any = null;
  dealDetailsAuthError: string = null;
  userLocation: any = null
  locationcalled: boolean = false;
  firstLoad: boolean = true;
  isDoorStepRequired: boolean = false;
  updateDeliverySec: boolean = false;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  dealHistorySubscriber: Subscription;
  selectedAssureDelivery: boolean = false;
  chatHistoryMsg: any;
  loggedInUserId: string = null;
  isReadLessText: any = [];
  msgTypeEnum = ChatMessageTypeEnums;
  isReadLessReply: any = [];
  screenType: string = 'small';
  revisionDeltaChanges: any = null;
  packingList = Constants.PACKING_LIST;
  identityId: string;
  detailsFromHistory: boolean = false;
  roomCreated: boolean = false;
  actionFrom: string = '';
  insuranceAmount: number = 0;
  averageRating: any = '';
  razorpay_option_key = environment.razorpay_option_key;
  showTips: string = '';
  razorpayOptions = {
    key: "",
    amount: 0,
    currency: "INR",
    prefill: { contact: "", email: "" },
    name: "",
    description: "",
    order_id: "",
    handler: (res) => console.log(res),
  };

  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private chatService: ChatService,
    private dealService: DealService,
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/home']);
    } else {
      this.loggedInUserId = this.authService.currentUserId;
      this.identityId = this.authService.getAuthInfo()?.userId;
    }

    this.route.paramMap.subscribe(params => {
      const Tdata = history.state.data;
      const actionFromtmp = history.state.action;
      this.currentDealId = params.get("id");
      if (this.currentDealId) {
        this.store.dispatch(
          DealActions.clearDealDetailsAuthError()
        );
        if (!Tdata) {
          this.detailsFromHistory = false;
          this.fetchDealDetails(this.currentDealId);
        } else {
          this.detailsFromHistory = true;
          this.dealDetails = { ...Tdata };
          this.roomCreated = true;
          this.actionFrom = actionFromtmp;
          this.ongoingCommunications();
          this.updateDealData();
        }
        setTimeout(() => {
          this.fetchDealHistory(this.currentDealId);
        }, 900);
      }
    });

    this.dealReloadSubscriber = this.store.select(navigateTodealList).subscribe(navigateTodealList => {
      if (navigateTodealList) {
        const url = this.router.serializeUrl(
          this.router.createUrlTree([`/deals/details/${this.currentDealId}`])
        );
        if (isPlatformBrowser(this.platformId)) {
          window.open(url, '_parent');
        }
      }
    });

    this.store.select(loader).subscribe(loaderState => {
      this.loader = loaderState;
    });
    this.store.select(dealErrorSelector).subscribe(message => {
      this.errorMessage = message;
    });
    this.lastFetchedDealDetailsSubscriber();
  }

  setBreadCrumb() {
    if (this.actionFrom) {
      let message = ''
      if (this.actionFrom == 'suggest') {
        message = 'Offer Initiated successfully!';
      } else if (this.actionFrom == 'update') {
        message = 'Offer updated successfully!';
      }
      if (message) {
        this.sharedService.showToaster(message, 'success')
      }
      this.actionFrom = ''
    }
    switch (this.dealDetails.dealStatus?.dealStatus) {
      case 'INITIATED':
        this.breadcrumb = this.dealDetails.callerIsReceiver ? [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Incomming',
          link: '/deals',
          click: 'incoming',
          dealType: 'incomming'
        },
        {
          name: 'Incomming offer',
          link: '',
          dealType: ''
        }] : [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Outgoing',
          link: '/deals',
          click: 'outgoing',
          dealType: 'outgoing'
        },
        {
          name: 'Outgoing offer',
          link: '',
          dealType: ''
        }];;
        this.showTips = this.dealDetails.callerIsReceiver ? 'incomming' : 'outgoing';
        break;
      case 'REVISED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Revised',
          link: '/deals',
          click: 'revised',
          dealType: 'outgoing'
        },
        {
          name: 'Revised offer',
          link: '',
          dealType: ''
        }];
        this.showTips = 'reviseOffer';
        break;
      case 'ACCEPTED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Accepted',
          link: '/deals',
          click: 'accepted',
          dealType: 'accepted'
        },
        {
          name: 'Accepted offer',
          link: '',
          dealType: ''
        }];
        if(this.dealDetails?.dealDeliveryMethod.id =='Shipping'){
          this.showTips = this.dealDetails.callerIsReceiver ? 'acceptedThirdpartyBuyer' : '';
        } else if(this.dealDetails?.dealDeliveryMethod.id =='Junction'){
          this.showTips = 'acceptedJunction';
        }
        break;
      case 'PAYMENT_REFUND_NEEDED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        },
        {
          name: 'Accepted offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'PAYMENT_REFUNDED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        },
        {
          name: 'Accepted offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'SHIPMENT_FAILED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        },
        {
          name: 'Accepted offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'REJECTED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Rejected',
          link: '/deals',
          click: 'rejected',
          dealType: 'rejected'
        },
        {
          name: 'Rejected offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'ABANDONED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Abandoned',
          link: '/deals',
          click: 'abandoned',
          dealType: 'abandoned'
        },
        {
          name: 'Abandoned offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'REPORTED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Reported',
          link: '/deals',
          click: 'reported',
          dealType: 'reported'
        },
        {
          name: 'Reported offer',
          link: '',
          dealType: ''
        }];
        break;
      case 'CLOSED':
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Closed',
          link: '/deals',
          click: 'closed',
          dealType: 'closed'
        },
        {
          name: 'Closed offer',
          link: '',
          dealType: ''
        }];
        this.showTips = 'ratingOffer';
        break;
      case 'PARTIAL_CLOSED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Partialy Closed',
          link: '/deals',
          click: 'partial_closed',
          dealType: 'partial_closed'
        },
        {
          name: 'Partialy Closed Offer',
          link: '',
          dealType: ''
        }];
        break;
    }
  }

  fetchDealDetails(dealRefId: string) {
    this.dealDetailsAuthError = null;
    this.store.dispatch(
      DealActions.fetchDealDetails({
        dealRefId
      })
    )
  }

  fetchDealHistory(dealRefId: string) {
    this.dealHistorySubscriber = this.dealService.getDealHistoryDelta(dealRefId)
      .subscribe(result => {
        if (result && result['payload']) {
          this.revisionDeltaChanges = result['payload']
        }
      });
  }

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      if (!this.detailsFromHistory) {
        this.dealDetails = {
          ...dealDetails.lastFetchedDealDetails
        };
        if (!this.roomCreated && this.dealDetails?.dealRefId) {
          if (this.dealDetails?.callerIsReceiver) {
            if (this.dealDetails?.offeredOffers && Array.isArray(this.dealDetails?.offeredOffers) && this.dealDetails?.offeredOffers.length) {
              this.getlLocation(this.dealDetails?.offeredOffers[0]['offerId'])
            }
          } else if (this.dealDetails?.requestedOffers && Array.isArray(this.dealDetails?.requestedOffers) && this.dealDetails?.requestedOffers.length) {
            this.getlLocation(this.dealDetails?.requestedOffers[0]['offerId'])
          }
          this.roomCreated = true;
          let identityId = '';
          if (this.dealDetails?.callerIsReceiver) {
            // if (this.dealDetails.sendingBusinessInfo) {
            //   identityId = this.dealDetails.sendingBusinessInfo?.businessId;
            // } else {
              identityId = this.dealDetails.sender?.id;
            //}
          } else {
            // if (this.dealDetails.receivingBusinessInfo) {
            //   identityId = this.dealDetails.receivingBusinessInfo?.businessId;
            // } else {
              identityId = this.dealDetails.receiver?.id;
            //}
          }
          if (identityId) {
            this.fetchUserRating(identityId);
          }
          this.ongoingCommunications();
        }
      }
      if (dealDetails.lastFetchedDealHistory) {
        this.dealHistory = {
          ...dealDetails.lastFetchedDealHistory
        };
      }
      this.updateDealData();
    });
  }

  getlLocation(offerId: string = '') {
    this.locationSubscriber = this.dealService.getUserLocation(offerId)
      .subscribe(result => {
        if (result['code'] == 200) {
          this.userLocation = result['payload'] ? result['payload'] : null;
        }
      });
  }

  updateDealData() {
    if (this.dealDetails?.receiver) {
      this.setBreadCrumb();
      if (this.dealDetails.callerIsReceiver) {
        this.userDetails = this.dealDetails.sender;
      } else {
        this.userDetails = this.dealDetails.receiver;
      }
      if (this.dealDetails.dealStatus.dealStatus == 'REVISED' || this.dealDetails.dealStatus.dealStatus == 'INITIATED') {
        if (this.dealDetails.dealDeliveryMethod.id == 'Shipping') {
          const zeroDimension = new RegExp("0.0X0.0X");
          if (this.dealDetails.callerIsReceiver && (zeroDimension.test(this.dealDetails.initiatorBoxDimension) || !this.dealDetails.initiatorBoxDimension)) {
            this.isDoorStepRequired = true;
          } else if (!this.dealDetails?.initiatorDeliveryAddress) {
            this.isDoorStepRequired = true;
          }
        }
      }
    }
  }

  acceptDeal() {
    if (this.isDoorStepRequired) {
      this.updateDeliverySec = true;
    } else {
      if (this.dealDetails?.dealDeliveryMethod?.id == 'Shipping') {
        let message = '';
        let validation = true;
        let query = 'cod=0';
        const doorStepDeliveryInfo = {
          pickupLocation: this.dealDetails?.initiatorPickupAddress,
          deliveryLocation: this.dealDetails?.initiatorDeliveryAddress,
          dimension: null,
          courierId: this.dealDetails?.initiatorCourierId,
          courierName: this.dealDetails?.initiatorCourierName,
          shippingAmount: this.dealDetails?.initiatorShippingAmount,
          insuranceOpted: this.dealDetails?.includeInsurance
        };
        const dimension = this.dealDetails?.initiatorBoxDimension;
        if (dimension) {
          let arrayd = dimension.split('X');
          if (arrayd && Array.isArray(arrayd)) {
            const dimension = {
              length: parseInt(arrayd[0]),
              breadth: parseInt(arrayd[1]),
              height: parseInt(arrayd[2]),
              weight: parseFloat(arrayd[3]),
            }
            doorStepDeliveryInfo.dimension = dimension;
            query = `${query}&length=${dimension.length}`;
            query = `${query}&breadth=${dimension.breadth}`;
            query = `${query}&height=${dimension.height}`;
            query = `${query}&weight=${dimension.weight}`;
          }
        } else {
          message = 'Please ask partner to update product dimension';
          validation = false;
        }
        if (doorStepDeliveryInfo.deliveryLocation?.zip) {
          query = `${query}&deliveryPostCode=${doorStepDeliveryInfo.deliveryLocation.zip}`;
        } else {
          message = 'Please ask initiator for Valid Delivery location';
          validation = false;
        }
        if (doorStepDeliveryInfo.pickupLocation?.zip) {
          query = `${query}&pickupPostCode=${doorStepDeliveryInfo.pickupLocation.zip}`;
        } else {
          message = 'Please select Valid Pickup location';
          validation = false;
        }

        if (doorStepDeliveryInfo?.courierId && validation) {
          this.acceptDealDoorStep(doorStepDeliveryInfo)
        } else {
          if (validation) {
            this.dealService.fetchThirdPartyVendor(query).subscribe(res => {
              if (res && res['payload'] && res['payload']['data'] && Array.isArray(res['payload']['data']['available_courier_companies']) && res['payload']['data']['available_courier_companies'].length) {
                const shippingVendor = res['payload']['data']['available_courier_companies'][0];
                if (shippingVendor && shippingVendor?.courier_company_id) {
                  doorStepDeliveryInfo.courierId = `${shippingVendor?.courier_company_id}`;
                  doorStepDeliveryInfo.courierName = `${shippingVendor?.courier_name}`;
                  doorStepDeliveryInfo.shippingAmount = `${shippingVendor?.rate}`;
                  this.acceptDealDoorStep(doorStepDeliveryInfo);
                } else {
                  this.sharedService.showToaster('Currently not receiving order please try again!', 'warning');
                }
              }
            }, err => {
              this.sharedService.showToaster('Currently not receiving order please try again!', 'warning');
            });
          } else {
            this.sharedService.showToaster(message, 'warning');
          }
        }
      } else {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.disableClose = true;
        dialogConfig.id = 'user-accept-offer-component';
        dialogConfig.height = 'auto';
        dialogConfig.data = {
          title: 'Are you sure, you want to accept the offer?'
        };
        const modalDialog = this.matDialog.open(ConfirmationBoxComponent, dialogConfig);
        modalDialog.afterClosed().subscribe(results => {
          if (results) {
            this.store.dispatch(DealActions.pageLoading());
            this.store.dispatch(DealActions.acceptDeal({ dealRefId: this.currentDealId }));
          }
        });
      }
    }
  }

  acceptDealDoorStep(doorStepDeliveryInfo: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-accept-offer-component';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      title: 'Are you sure, you want to accept the offer?'
    };
    const modalDialog = this.matDialog.open(ConfirmationBoxComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(results => {
      if (results) {
        this.store.dispatch(DealActions.pageLoading());
        this.store.dispatch(DealActions.acceptDealDoorStep({ dealRefId: this.currentDealId, doorStepDeliveryInfo }));
      }
    });
  }

  rejectDeal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-delete-confirm-component';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      title: 'Are you sure, you want to reject the offer?'
    };
    const modalDialog = this.matDialog.open(ConfirmationBoxComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(results => {
      if (results) {
        this.store.dispatch(DealActions.pageLoading());
        this.store.dispatch(DealActions.rejectDeal({ dealRefId: this.currentDealId }));
      }
    });
  }

  openCloseDialog(type: string = '') {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'gintaa-report-offer-component' + type;
    dialogConfig.position = { top: '10px', };
    dialogConfig.height = 'auto';
    dialogConfig.width = '496px';
    dialogConfig.data = {
      dealRefNo: this.currentDealId,
      closeStep: 'optpopup',
      closeDeal: false,
      identityId: this.identityId,
      showOtp: true
    };
    if (type !== '') {
      dialogConfig.data.closeStep = type;
    }
    if (type === 'RATE_USER') {
      dialogConfig.data.closeDeal = true;
    }
    if (type == 'optpopup' || type == 'optpopupshow') {
      if (this.dealDetails?.dealStatus?.dealStatus == 'PARTIAL_CLOSED') {
        dialogConfig.data.showOtp = this.isLastModifier();
      }
      this.store.dispatch(DealActions.pageLoading());
      this.store.dispatch(DealActions.resendOtpStart({ dealRefId: this.currentDealId }));
    }

    const modalDialog = this.matDialog.open(DealClosePopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      this.store.dispatch(DealActions.clearDealQuestion());
      // do something with results
      // this.router.navigate([`/deals/accepted/${this.dealRefId}`]);
    });
  }

  updateOffer(dealRefId) {
    this.router.navigate([`/deals/update/${dealRefId}`]);
  }

  createRoom() {
    //chat with firestore
    this.chatStateSubscriber = this.chatService.createRoom(this.dealDetails, ChatTypeEnums.deal).subscribe((res: any) => {
      const response: any = res;
      this.router.navigateByUrl(`chat/${ChatTypeEnums.deal}/${this.dealDetails.dealRefId}/rooms/${response.roomId}/messages`);
    }, (error => {
    })
    );
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  getDealReceiverDetails() {
    if (this.dealDetails && this.dealDetails.receiver) {
      return {
        name: this.dealDetails.receiver.name,
        imageUrl: this.dealDetails.receiver.imageUrl
      }
    }
  }

  getDealSenderDetails() {
    if (this.dealDetails && this.dealDetails.sender) {
      return {
        name: this.dealDetails.sender.name,
        imageUrl: this.dealDetails.sender.imageUrl
      }
    }
  }

  getDealDeliveryMethod() {
    if (this.dealDetails.dealDeliveryMethod.id === 'Self') {
      return 'Personal meeting';
    } else {
      return this.dealDetails.dealDeliveryMethod.name;
    }
  }

  formatDate(date: string) {
    return date.replace(/-/g, '');
  }

  showCheckOutLayout() {
    if (this.dealDetails.dealStatus.dealStatus == 'ACCEPTED' && this.dealDetails.dealDeliveryMethod && this.dealDetails.dealDeliveryMethod?.id == 'Shipping') {
      return !this.dealDetails?.callerIsReceiver;
    } else {
      return false
    }
  }

  showButton(button = '') {
    let result = true;
    if (button != '' && this.dealDetails.dealRefId) {
      if (button === 'reject') {
        //const isLastModifier = this.isLastModifier();
        if ((this.dealDetails.dealStatus.dealStatus == 'INITIATED' || this.dealDetails.dealStatus.dealStatus == 'REVISED' || this.dealDetails.dealStatus.dealStatus == 'ACCEPTED')) {
          result = true;
        } else {
          result = false;
        }
      } else if (button === 'accept') {
        const isLastModifier = this.isLastModifier();
        if ((this.dealDetails.dealStatus.dealStatus == 'INITIATED' || this.dealDetails.dealStatus.dealStatus == 'REVISED') && !isLastModifier) {
          result = true;
        } else {
          result = false;
        }
      } else if (button === 'revised') {
        if (this.dealDetails.dealStatus.dealStatus == 'INITIATED' || this.dealDetails.dealStatus.dealStatus == 'REVISED') {
          result = true;
        } else {
          result = false;
        }
      } else if (button === 'edit') {
        if (this.dealDetails.dealStatus.dealStatus == 'INITIATED' && !this.dealDetails.callerIsReceiver) {
          result = true;
        } else {
          result = false;
        }
      } else if (button === 'close') {
        if (this.dealDetails.dealStatus.dealStatus == 'ACCEPTED' || this.dealDetails.dealStatus.dealStatus == 'PARTIAL_CLOSED') {
          if (this.dealDetails.dealDeliveryMethod && this.dealDetails.dealDeliveryMethod?.id == 'Shipping') {
            result = false;
          } else {
            const isLastModifier = this.isLastModifier();
            if (this.dealDetails.dealStatus.dealStatus == 'PARTIAL_CLOSED') {
              result = !isLastModifier
            } else {
              result = true;
            }
          }
        } else {
          result = false;
        }
      } else if (button === 'pay') {
        if (this.dealDetails.dealStatus.dealStatus == 'ACCEPTED' && this.dealDetails.dealDeliveryMethod && this.dealDetails.dealDeliveryMethod?.id == 'Shipping' && !this.dealDetails?.callerIsReceiver) {
          return !this.dealDetails?.initiatorPaidAmount;
        } else {
          result = false;
        }
      } else if (button === 'otp') {
        if (this.dealDetails.dealStatus.dealStatus == 'PARTIAL_CLOSED') {
          result = this.isLastModifier();
        } else {
          result = false;
        }
      } else if (button === 'rate') {
        const isClosedOffer = this.isClosedOffer();
        if ((this.dealDetails.dealStatus.dealStatus == 'CLOSED') && isClosedOffer) {
          result = true;
        } else {
          result = false;
        }
      } else if (button === 'report' || button === 'chat') {
        if (this.dealDetails.dealStatus.dealStatus != 'CLOSED') {
          result = true;
        } else {
          result = false;
        }
      }
    }
    return result;
  }

  isLastModifier() {
    if (this.dealDetails.callerIsReceiver) {
      return this.dealDetails.receiver.id == this.dealDetails.triggeredByUserId;
    } else {
      return this.dealDetails.sender.id == this.dealDetails.triggeredByUserId;
    }
  }

  isClosedOffer() {
    const isLastModifier = this.isLastModifier();
    if (this.dealDetails.callerIsReceiver) {
      if (!this.dealDetails.dealRatedByReceiver) {
        return this.dealDetails.dealStatus.dealStatus == 'CLOSED' ? true : isLastModifier;
      } else {
        return false;
      }
    } else {
      if (!this.dealDetails.dealRatedBySender) {
        return this.dealDetails.dealStatus.dealStatus == 'CLOSED' ? true : isLastModifier;
      } else {
        return false;
      }
    }
  }

  ongoingCommunications() {
    this.chatSubscriber = this.chatService.createRoom(this.dealDetails, ChatTypeEnums.deal).subscribe((res: any) => {
      const response: any = res;
      this.chatService.getChatMessagesByRoomId({
        entityId: this.currentDealId,
        roomId: response.roomId,
        chatType: ChatTypeEnums.deal,
        orderType: 'asc'
      })
        .subscribe((fireStoreRes: any) => {
          this.chatHistoryMsg = fireStoreRes;
        }, (error) => {
          this.chatHistoryMsg = null;
        });
    }, (error => {
    })
    );
  }

  showTime(utcDateTime: string) {
    if (utcDateTime) {
      const locatDateTime = moment.utc(utcDateTime).toDate();
      const localTime = moment(locatDateTime).format('hh:mm a');
      return localTime;
    }
  }

  showrUserImage(msg: any) {
    return msg.messageAttr.senderImage && msg.messageAttr.senderImage.length > 0
      && msg.messageAttr.senderImage[0] ? msg.messageAttr.senderImage[0]
      : this.userNoImage;
  }

  onClickBreadCrumb(data: any) {
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

  openImageViewModal(name: string, images: [], isVideo: boolean) {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'image-chat-view-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '900px';
    dialogConfig.data = { files: images, name, isVideo };
    const modalDialog: MatDialogRef<ChatAttachImageComponent, any> = this.matDialog.open(ChatAttachImageComponent, dialogConfig);
  }

  downloadFile(message) {
    if (message.messageAttr && message.messageAttr.mediaUrls) {
      const url = message.messageAttr.mediaUrls[0];
      //this.chatService.downloadFile(url);
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_blank');
      }
    }
  }

  checkIsLoggedInUser(id: string, name: string) {
    return id === this.loggedInUserId ? 'You' : name;
  }

  getTotalPayableAmount() {
    let amount = this.dealDetails?.dealValue;
    if (this.dealDetails?.initiatorShippingAmount) {
      amount = parseFloat(amount) + parseFloat(this.dealDetails?.initiatorShippingAmount)
    }
    if (this.dealDetails?.includeInsurance) {
      amount = amount + this.getInsuranceAmount();
    }
    return amount;
  }

  fetchUserRating(userId: string) {
    this.dealService.getUserRating(userId)
      .subscribe(result => {
        if (result && result['payload'] && result['payload']['averageRating']) {
          this.averageRating = parseFloat(result['payload']['averageRating']).toFixed(1);
        }
      });
  }

  ngOnDestroy() {
    try {
      this.store.dispatch(
        DealActions.emptyInitiateData()
      );
      this.dealStateSubscriber.unsubscribe();
      this.dealReloadSubscriber.unsubscribe();
    } catch (e) {
    }
    try {
      this.dealHistorySubscriber.unsubscribe();
    } catch (e) {
    }
    try {
      this.chatStateSubscriber.unsubscribe();
    } catch (e) {
    }
    try {
      this.locationSubscriber.unsubscribe();
    } catch (e) {
    }
    try {
      this.chatSubscriber.unsubscribe();
    } catch (e) {
    }

  }

  getInsuranceAmount() {
    return (parseFloat(`${this.dealDetails?.dealValue}`) * 2) / 100;
  }

  addInsurance(e) {
    // console.log('revise')
  }

  payNow() {
    this.dealService.registerPayment(this.currentDealId).subscribe((res) => {
      if (res && res['body'] && res['body']['payload']) {
        this.razorpayOptions.key = this.razorpay_option_key;
        this.razorpayOptions.order_id = res['body']['payload'],
          this.razorpayOptions.handler = this.razorPayHandler;
        const userInfo = this.authService.getAuthInfo();
        if (userInfo) {
          let userdata:any = {
            phoneNumber: '',
            email: ''
          };
          if (userInfo?.providerData && Array.isArray(userInfo?.providerData)) {
            if (userInfo?.providerData.length == 2) {
              userdata['phoneNumber'] = userInfo?.providerData[0]['phoneNumber'] ? userInfo?.providerData[0]['phoneNumber'] : userInfo?.providerData[1]['phoneNumber'];
              userdata['email'] = userInfo?.providerData[0]['email'] ? userInfo?.providerData[0]['email'] : userInfo?.providerData[1]['email'];
            } else {
              userdata = userInfo?.providerData[0];
            }
          } else {
            userdata = userInfo?.providerData;
          }
          this.razorpayOptions["prefill"].contact = userdata ? (userdata?.phoneNumber ? userdata?.phoneNumber : '') : '';
          this.razorpayOptions["prefill"].email = userdata ? (userdata?.email ? userdata?.email : '') : '';
          var rzp1 = new Razorpay(this.razorpayOptions);
          rzp1.open();
        } else {
          let message = localization.deal.ACCOUNT_DETAILS_REQUIRED;
          this.sharedService.showToaster(message, 'warning');
        }
      } else {
        let message = localization.deal.PAYMENT_FAILED;
        this.sharedService.showToaster(message, 'warning');
      }
    }, err => {
      const message = localization.deal.PAYMENT_FAILED;
      this.sharedService.showToaster(message, 'warning');
    });
  }

  razorPayHandler = (response) => {
    if (response) {
      if (response?.razorpay_order_id && response?.razorpay_signature) {
        this.sharedService.showToaster('Payment Success', 'success');
        this.redirectDeal();
      } else {
        this.sharedService.showToaster('Payment Failed, please try again', 'warning');
        this.redirectDeal();
      }
    }
  };

  redirectDeal() {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`deals/details/${this.currentDealId}`])
    );
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_parent');
    }
  }

  getRatedByUser() {
    return this.dealDetails?.callerIsReceiver ? this.dealDetails?.dealReceiverRating : this.dealDetails?.dealSenderRating;
  }

}
