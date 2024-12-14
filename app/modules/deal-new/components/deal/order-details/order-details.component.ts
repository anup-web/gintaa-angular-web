import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from '@gintaa/core/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as gintaaApp from '@gintaa/store/app.reducer';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { ConfirmationBoxComponent } from '@gintaa/shared/components/confirmation-box/confirmation-box.component';
import { DealDetailsFormat, DealAvailableTabs } from '@gintaa/modules/deal-new/models/deal.model';
import { navigateTodealList, loader, selectDealState, dealErrorSelector } from '@gintaa/modules/deal-new/store/deal.selectors';
import { isPlatformBrowser } from '@angular/common';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import localization from '@gintaa/config/localization';
import { Subscription } from 'rxjs';
import * as Constants from '@gintaa/config/constant.config';
import { environment } from '@gintaa/env';
declare var Razorpay: any;

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  currentDealId: string = null;
  dealDetails: DealDetailsFormat = null;
  breadcrumb: any = [{
    name: 'My Offers',
    link: '/deals',
  }];
  loader: boolean = true;
  errorMessage: string = null;
  dealDetailsAuthError: string = null;
  dealRejected: boolean = false;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  allPossibleDealTabs = DealAvailableTabs;
  dealStateSubscriber: Subscription;
  razorpay_option_key = environment.razorpay_option_key;
  razorpayOptions = {
    key: "",
    amount: 0,
    currency: "INR",
    prefill: { contact: "", email: "" },
    name: "",
    description: "",
    order_id: "",
    handler: (res) => console.log(),
  };

  constructor(
    public matDialog: MatDialog,
    private store: Store<gintaaApp.AppState>,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private dealService: DealService,
    public sharedService: SharedService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/home']);
    }

    this.route.paramMap.subscribe(params => {
      this.currentDealId = params.get("id");
      if (this.currentDealId) {
        this.store.dispatch(
          DealActions.clearDealDetailsAuthError()
        );
        this.fetchDealDetails(this.currentDealId);
      }
    });

    this.store.select(navigateTodealList).subscribe(navigateTodealList => {
      if (navigateTodealList) {
        this.router.navigate([`/deals`]);
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
    switch (this.dealDetails.dealStatus?.dealStatus) {
      case 'INITIATED':
        this.breadcrumb = this.dealDetails.callerIsReceiver ? [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Incomming',
          link: '/deals',
          click: 'incoming',
          dealType: 'incomming'
        },
        {
          name: 'Incomming Deal',
          link: '',
          dealType: ''
        }] : [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Outgoing',
          link: '/deals',
          click: 'outgoing',
          dealType: 'outgoing'
        },
        {
          name: 'Outgoing Deal',
          link: '',
          dealType: ''
        }];;
        break;
      case 'REVISED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Revised',
          link: '/deals',
          click: 'revised',
          dealType: 'outgoing'
        },
        {
          name: 'Revised Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'ACCEPTED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Accepted',
          link: '/deals',
          click: 'accepted',
          dealType: 'accepted'
        },
        {
          name: 'Accepted Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'REJECTED':
        this.dealRejected = true;
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Canceled',
          link: '/deals',
          click: 'rejected',
          dealType: 'rejected'
        },
        {
          name: 'Canceled Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'ABANDONED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Abandoned',
          link: '/deals',
          click: 'abandoned',
          dealType: 'abandoned'
        },
        {
          name: 'Abandoned Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'REPORTED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Reported',
          link: '/deals',
          click: 'reported',
          dealType: 'reported'
        },
        {
          name: 'Reported Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'SHIPMENT_FAILED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Accepted',
          link: '/deals',
          click: 'accepted',
          dealType: 'accepted'
        },
        {
          name: 'Accepted Deal',
          link: '',
          dealType: ''
        }];
        break;
      case 'CLOSED':
        this.breadcrumb = [{
          name: 'My Offers',
          link: '/deals',
        }, {
          name: 'Closed',
          link: '/deals',
          click: 'closed',
          dealType: 'closed'
        },
        {
          name: 'Closed Deal',
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

  lastFetchedDealDetailsSubscriber() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe(dealDetails => {
      this.dealDetails = {
        ...dealDetails.lastFetchedDealDetails
      };
      if (this.dealDetails.dealRefId) {
        this.setBreadCrumb();
      }
    })
  }

  cancelDeal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.id = 'user-cancel-confirm-component';
    dialogConfig.height = 'auto';
    dialogConfig.data = {
      title: 'Are you sure, you want to cancel this offer?'
    };
    const modalDialog = this.matDialog.open(ConfirmationBoxComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(results => {
      if (results) {
        this.dealService.rejectDeal({ dealRefId: this.currentDealId, comment: 'cancel direct buy' }).subscribe((res) => {
          let message = localization.deal.DEAL_REJECT_SUCCESS;
          if (res && res['code'] == 200 && res['message']) {
            message = res['message'];
            this.dealRejected = true;
            this.sharedService.showToaster(message, 'success');
            const url = this.router.serializeUrl(
              this.router.createUrlTree([`deals/order-details/${this.currentDealId}`])
            );
            if (isPlatformBrowser(this.platformId)) {
              window.open(url, '_parent');
            }
          } else {
            message = localization.deal.DEAL_REJECT_FAILED;
            this.sharedService.showToaster(message, 'warning');
          }
        }, err => {
          let message = localization.deal.DEAL_REJECT_FAILED;
          if (err && err['error'] && err['error']['message']) {
            message = err['error']['message'];
          }
          this.sharedService.showToaster(message, 'warning');
        })
      }
    });
  }

  payNow() {
    this.dealService.registerPayment(this.currentDealId).subscribe((response) => {
      if (response && response['body'] && response['body']['payload']) {
        this.razorpayOptions.key = this.razorpay_option_key;
        this.razorpayOptions.order_id = response['body']['payload'],
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
        }
      } else {
        let message = localization.deal.PAYMENT_FAILED;
        this.sharedService.showToaster(message, 'warning');
      }
    }, err => {
      let message = localization.deal.PAYMENT_FAILED;
      if (err && err['error'] && err['error']['message']) {
        message = err['error']['message'];
      }
      this.sharedService.showToaster(message, 'warning');
    });
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );

    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
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

  formatDate(date: string) {
    return date.replace(/-/g, '');
  }

  razorPayHandler = (response) => {
    if (response) {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`deals/order-details/${this.currentDealId}`])
      );
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_parent');
      }
    } else {
      let message = localization.deal.PAYMENT_FAILED;
      this.sharedService.showToaster(message, 'warning');
    }
  };

  getTotalPayableAmount(){
    if(this.dealDetails?.dealValue){
      return this.dealDetails?.dealValue + this.dealDetails?.initiatorShippingAmount;
    } else {
      return ''
    }
  }

  ngOnDestroy() {
    try {
      this.dealStateSubscriber.unsubscribe();
    } catch (e) {
    }
  }

  showCancel(){
    if(this.dealDetails?.callerIsReceiver){
      return true;
    } else {
      if(this.dealDetails?.dealRefId && (!this.dealDetails?.initiatorPaidAmount || !this.dealDetails?.paymentInProgress)){
        return true;
      } else {
        return false;
      }
    }
  }

}
