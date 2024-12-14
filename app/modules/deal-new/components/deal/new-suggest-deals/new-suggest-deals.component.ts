import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '@gintaa/core/services/auth.service';
import { SharedService } from '@gintaa/shared/services/shared.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import Moment from 'moment';
import localization from '@gintaa/config/localization';
import * as gintaaApp from '@gintaa/store/app.reducer';
import * as Constants from '@gintaa/config/constant.config';
import { DealActions } from '@gintaa/modules/deal-new/store/action-types';
import { Offer } from '@gintaa/modules/offer/model/offer';
import { InitiateDealRequestObject, DealHistory, DealDetailsFormat } from '@gintaa/modules/deal-new/models/deal.model';
import { selectDealState, selectlastFetchedDealDetails } from '@gintaa/modules/deal-new/store/deal.selectors';
import { DealOffersListPopupComponent } from '@gintaa/modules/deal-new/components/deal/deal-offers-list-popup/deal-offers-list-popup.component';
import { MatRadioChange } from '@angular/material/radio';
@Component({
  selector: 'app-new-suggest-deals',
  templateUrl: './new-suggest-deals.component.html',
  styleUrls: ['./new-suggest-deals.component.scss']
})
export class NewSuggestDealsComponent implements OnInit {

  bidSubscription: Subscription;
  dealStateSubscriber: Subscription;
  deliverySubscriber: Subscription;
  dealUpdateSubscriber: Subscription;
  pageType: string = 'suggest';
  offerId: string = null;
  dealRefId: string = null;
  dealDetails: DealDetailsFormat = null;
  dealHistory: DealHistory = null;
  receiverAllOffer: Offer[] = [];
  receiverSelectedOffers: any = [];
  senderAllOffer: Offer[] = [];
  senderSelectedOffers: any = [];
  receiverDetails: any = null;
  senderDetails: any = null;
  userNoImage: string = 'assets/images/user-default-img/chatu-noimg.svg';
  offerPerPage: number = 8;
  addressList: any = [];
  selectedDeliveryOption: string = 'Self';
  deliveryMode: string = 'Self';
  dealFormValid: boolean = false;
  whowillPayError: string = '';
  loader: boolean = true;
  errorMessage: string = null;
  userLocation: any = null;
  receiverofferDetails: Offer = null;
  deliveryAddress: any = null;
  shippingVendor: any;
  selectedAssureDelivery: boolean = true;
  selectedAssureAmount: number = 0;
  totalAmount: any = '';
  offerPrice: any = '';
  bidPrice: any = 0;
  calculateShipping: boolean = false;
  maxAmountError: boolean = false;
  maxAmountMessage: string = null;
  disableSuggestBtn: boolean = false;
  isAuctionUser: boolean = false;
  calledBid: boolean = false;
  fetchedRating: boolean = false;
  isbusinessOffer: boolean = false;
  averageRating: any = '';
  zeroDimension = new RegExp("0.0X0.0X");
  availableDeliveryOptions: string[] = [
    'Self',
    'Shipping',
    'Junction',
    'IndiaPost'
  ];
  junctionDays: any = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
  selectedThirdPartyOption: string = 'Shipping';
  thirdPartyDelivery: boolean = false;
  showTips: string = '';
  breadcrumb: any = [{
    name: 'My offers',
    link: '/deals',
  }, {
    name: 'Outgoing',
    link: '/deals',
    dealType: 'outgoing'
  },
  {
    name: 'Suggest an offer',
    link: '',
    dealType: ''
  }];
  selectedJunction: any = null;
  packingList = Constants.PACKING_LIST;
  dimension: any = {
    breadth: 0,
    height: 0,
    length: 0,
    weight: 0
  }

  requestObject = {
    amountCurrency: 'INR',
    dealRefNo: '',
    sender: {
      selectedOffers: [],
      giveMoney: false,
    },
    receiver: {
      selectedOffers: [],
      giveMoney: false,
    },
    defaultDeliveryOption: {
      doorStepDelivery: false,
      selfPickup: false,
      dropToGintaaJunction: false,
    },
    includeShipping: false,
    includeInsurance: false,
    expiryDate: '20220101',
    gintaaJunctionId: null,
    meetingDate: null,
    meetingStartTime: '',
    meetingEndTime: '',
    dropToGintaaJunction: false,
    gintaaJunctions: [],
    suggestRequestMoney: {
      selected: false,
      willPay: '',
      amount: null
    },
    thirdPartyOption: {
      deliveryAddress: {
        "addressLine": '',
        "annotation": '',
        "area": '',
        "city": '',
        "lng": '',
        "lat": '',
        "country": '',
        "email": '',
        "flatNo": '',
        "id": '',
        "landmark": '',
        "latitude": 0,
        "longitude": 0,
        "mobile": '',
        "state": '',
        "zip": ''
      },
      insurance: false,
      insuranceAmount: ''
    }
  };

  suggestDealValidator = {
    receiver: {
      required: true,
      invalid: false,
      error: 'You must choose one offer to suggest an offer.',
    },
    sender: {
      required: true,
      invalid: false,
      error: 'You must choose one item or amount to suggest an offer.',
    },
    selectedDeliveryOption: {
      required: true,
      invalid: false,
      error: 'Delivery option is required',
    },
    suggestRequestMoney: {
      required: false,
      invalid: false,
      error: '',
    },
    amountValidation: {
      required: false,
      invalid: false,
      error: 'Please enter valid amount',
    },
  };

  gintaaJunctionValidator = {
    gintaaJunctionId: {
      required: true,
      invalid: false,
      error: 'You must choose one gintaa junction.',
    },
    meetingDate: {
      required: true,
      invalid: false,
      error: 'You must choose meeting date.',
    },
    meetingStartTime: {
      required: true,
      invalid: false,
      error: 'Meeting time is required',
    },
    meetingEndTime: {
      required: false,
      invalid: false,
      error: 'Meeting end time option is required',
    },
  };

  thirdPartyValidator = {
    deliveryAddress: {
      required: true,
      invalid: false,
      error: 'You must choose a delivery address.',
    }
  }

  constructor(
    private store: Store<gintaaApp.AppState>,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    public matDialog: MatDialog,
    public sharedService: SharedService,
    private dealService: DealService,
    private firestore: AngularFirestore,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.data.subscribe(v => this.pageType = v.page_type);
    this.route.paramMap.subscribe(params => {
      if (this.pageType === 'suggest') {
        this.offerId = params.get("id");
        this.dealRefId = null;
      } else {
        this.dealRefId = params.get("id");
        this.offerId = null;
        this.breadcrumb = [{
          name: 'My offers',
          link: '/deals',
        }, {
          name: 'Revised',
          link: '/deals',
          click: 'revised',
          dealType: 'revised'
        },
        {
          name: 'Revised offer',
          link: '',
          dealType: ''
        }];
      }
    });
    this.subscribeOffers();
    this.fetchOfferOrDeal();
  }

  subscribeOffers() {
    this.dealStateSubscriber = this.store.select(selectDealState).subscribe((dealstatus: any) => {
      this.loader = dealstatus.loading;
      this.errorMessage = dealstatus.message;
      const initiateDeal = dealstatus.initiateDeal;
      if (initiateDeal) {
        this.receiverAllOffer = dealstatus.initiateDeal.receiverAllOffers;
        if (this.receiverAllOffer && this.receiverAllOffer[0]) {
          this.userLocation = this.receiverAllOffer[0]['location'];
          if (this.pageType === 'suggest') {
            if (this.receiverAllOffer[0]['businessOffer']) {
              this.receiverDetails = {
                isBusiness: true,
                identityId: this.receiverAllOffer[0]['business']['businessId'],
                name: this.receiverAllOffer[0]['business']['name'],
                imageUrl: this.receiverAllOffer[0]['business']['logoUrl'],
                averageRating: 0,
              };
            } else {
              this.receiverDetails = {
                isBusiness: false,
                identityId: this.receiverAllOffer[0]['user']['identityId'],
                name: this.receiverAllOffer[0]['user']['name'],
                imageUrl: this.receiverAllOffer[0]['user']['imageUrl'],
                averageRating: 0,
              };
            }
            if (!this.fetchedRating) {
              this.fetchedRating = true;
              this.fetchUserRating(this.receiverAllOffer[0]['user']['identityId']);
            }
            if ((this.receiverDetails?.identityId && this.senderDetails?.identityId && (this.receiverDetails?.identityId === this.senderDetails?.identityId))) {
              this.router.navigate(['/']);
            }
            this.receiverofferDetails = this.receiverAllOffer.find((val) => val.offerId == this.offerId);
            if (!this.calledBid && this.receiverofferDetails['auctioned']) {
              this.getBiddingInformation(this.receiverofferDetails['offerId'])
            }
          }
        }
        this.receiverSelectedOffers = dealstatus.initiateDeal.receiverSelectedOffers;
        if (this.receiverSelectedOffers && this.receiverSelectedOffers[0]) {
          this.requestObject.receiver.selectedOffers = this.receiverSelectedOffers.filter((val) => {
            return val.selectedOffer;
          });
          if (this.pageType === 'suggest') {
            if (this.receiverofferDetails.exchangeMode === 'Money') {
              this.isbusinessOffer = this.receiverofferDetails?.businessOffer;
              if (this.receiverofferDetails?.dimensions && Array.isArray(this.receiverofferDetails?.dimensions) && this.receiverofferDetails?.dimensions.length) {
                const dimension = this.receiverofferDetails?.dimensions[0];
                this.dimension = {
                  length: parseInt(dimension.length),
                  breadth: parseInt(dimension.breadth),
                  height: parseInt(dimension.height),
                  weight: parseFloat(dimension.weight),
                };
              }
              if (!this.offerPrice) {
                this.offerPrice = this.receiverofferDetails?.price;
              }
              this.calculatetotalAmount('money');
            } else {
              this.suggestDealValidator.sender.invalid = false;
            }
          } else if (this.requestObject.receiver.selectedOffers && this.requestObject.receiver.selectedOffers[0]) {
            const offer = this.requestObject.receiver.selectedOffers.find(val => val.selectedOffer);
            if (offer) {
              this.receiverofferDetails = this.receiverAllOffer.find((val) => val.offerId == offer['offerId']);
              if (this.receiverofferDetails.exchangeMode === 'Money') {
                this.isbusinessOffer = this.receiverofferDetails?.businessOffer;
                if (this.receiverofferDetails?.dimensions && Array.isArray(this.receiverofferDetails?.dimensions) && this.receiverofferDetails?.dimensions.length) {
                  const dimension = this.receiverofferDetails?.dimensions[0];
                  this.dimension = {
                    length: parseInt(dimension.length),
                    breadth: parseInt(dimension.breadth),
                    height: parseInt(dimension.height),
                    weight: parseFloat(dimension.weight),
                  };
                }
                if (!this.offerPrice) {
                  this.offerPrice = this.dealDetails?.requestedAmount / offer['selectedQuantity']
                }
                this.calculatetotalAmount('money');
              }
              if (!this.calledBid && this.receiverofferDetails['auctioned']) {
                this.getBiddingInformation(this.receiverofferDetails['offerId'])
              }
            }
          }
        }
        this.senderAllOffer = dealstatus.initiateDeal.senderAllOffers;
        this.senderSelectedOffers = dealstatus.initiateDeal.senderSelectedOffers;
        if (this.senderSelectedOffers && this.senderSelectedOffers[0]) {
          this.requestObject.sender.selectedOffers = this.senderSelectedOffers.filter((val) => {
            return val.selectedOffer;
          });
        }
        if (this.requestObject.sender.selectedOffers && this.requestObject.sender.selectedOffers.length) {
          this.suggestDealValidator.sender.invalid = false;
        }
        this.requestObject.thirdPartyOption = initiateDeal.thirdPartyOption;
        if (initiateDeal.gintaaJunction) {
          this.selectedJunction = initiateDeal.gintaaJunction;
          this.requestObject.gintaaJunctionId = initiateDeal.gintaaJunction?.id;
        } else {
          this.requestObject.gintaaJunctionId = '';
        }
        if (initiateDeal.junctionMeetingDate) {
          this.requestObject.meetingDate = Moment(initiateDeal.junctionMeetingDate).format('YYYYMMDD');
        } else {
          this.requestObject.meetingDate = '';
        }
        if (initiateDeal.junctionMeetingTime) {
          this.requestObject.meetingStartTime = Moment(initiateDeal.junctionMeetingTime).format('HH:mm:ss');
        } else {
          this.requestObject.meetingStartTime = '';
        }
      }
    });
  }

  getBiddingInformation(offerId) {

    this.bidSubscription = this.firestore.collection('auctions').doc(offerId).collection('bids', (ref) => { return ref.where("bidPrice", "!=", "0").orderBy("bidPrice", "desc").limit(1) }).valueChanges().subscribe(data => {
      let bids = [];
      if (data) {
        bids = data.map(e => {
          return e as any;
        });
      }
      if (bids.length > 0) {
        const currentUser = this.authService.getSignInInput();
        if (bids[0]) {
          if (this.pageType == 'suggest') {
            this.isAuctionUser = (currentUser?.userId === bids[0]?.userId);
          } else {
            this.isAuctionUser = true;
          }
          this.bidPrice = bids[0]['bidPrice'];
          this.calculatetotalAmount('bidPrice');
        }
      }
    });
  }

  fetchOfferOrDeal() {
    if (this.dealRefId !== null) {
      this.getDealDetails(this.dealRefId);
      this.pageType = 'revise';
    } else if (this.offerId !== null) {
      const isOwnerLoggedIn = this.authService.isSwitchedToBusinessProfile();
      if (isOwnerLoggedIn) {
        const businesslist = this.authService.getAuthInfo()?.business;
        const selectedBusinessId = this.authService.getSelectedBusinessId();
        if (selectedBusinessId && selectedBusinessId?.businessId) {
          const businessData = businesslist.find(val => val.businessId == selectedBusinessId?.businessId)
          if (businessData) {
            this.senderDetails = {
              isBusiness: true,
              identityId: businessData.businessId,
              name: businessData.name,
              imageUrl: businessData.logo,
              averageRating: 0,
            };
          }
        }
      } else {
        this.senderDetails = {
          identityId: this.authService.getAuthInfo()?.userId,
          name: this.authService.getAuthInfo()?.username,
          imageUrl: this.authService.getAuthInfo()?.profileUrl,
          averageRating: 0,
        };
      }
      this.getUserOffer(this.offerId);
      if (this.senderDetails?.identityId) {
        this.getMyOffer(this.senderDetails?.identityId);
      }
    }
    // this.getUserDefaultAddress();
  }

  fetchDealSuccess(dealDetails: DealDetailsFormat) {
    if (this.dealDetails?.dealRefId) {
      this.selectedAssureDelivery = this.dealDetails?.includeInsurance;
      if (this.dealDetails?.dealStatus?.dealStatus == 'INITIATED' || this.dealDetails?.dealStatus?.dealStatus == 'REVISED') {
        if (this.dealDetails.dealDeliveryMethod?.id == 'Shipping' || this.dealDetails.dealDeliveryMethod?.id == 'IndiaPost') {
          this.selectedThirdPartyOption = this.dealDetails.dealDeliveryMethod?.id;
          this.selectedDeliveryOption = 'Shipping';
          this.showTips = this.dealDetails.dealDeliveryMethod?.id;
          if (this.dealDetails?.callerIsReceiver) {
            if (this.zeroDimension.test(this.dealDetails.initiatorBoxDimension) || !this.dealDetails.initiatorBoxDimension) {
              this.disableSuggestBtn = true;
            }
          }
        } else {
          this.selectedDeliveryOption = this.dealDetails.dealDeliveryMethod?.id;
        }
        if (this.dealDetails.receivingBusinessInfo) {
          this.receiverDetails = {
            isBusiness: true,
            identityId: this.dealDetails.receivingBusinessInfo?.businessId,
            name: this.dealDetails.receivingBusinessInfo?.name,
            imageUrl: this.dealDetails.receivingBusinessInfo?.logo,
            averageRating: 0,
          };
        } else {
          this.receiverDetails = {
            isBusiness: false,
            identityId: this.dealDetails.receiver.id,
            name: this.dealDetails.receiver.name,
            imageUrl: this.dealDetails.receiver.imageUrl,
            averageRating: 0,
          };
        }
        if (this.dealDetails.sendingBusinessInfo) {
          this.senderDetails = {
            isBusiness: true,
            identityId: this.dealDetails.sendingBusinessInfo.businessId,
            name: this.dealDetails.sendingBusinessInfo.name,
            imageUrl: this.dealDetails.sendingBusinessInfo.logo,
            averageRating: 0,
          };
        } else {
          this.senderDetails = {
            isBusiness: false,
            identityId: this.dealDetails.sender.id,
            name: this.dealDetails.sender.name,
            imageUrl: this.dealDetails.sender.imageUrl,
            averageRating: 0,
          };
        }
        let identityId = '';
        if (this.dealDetails?.callerIsReceiver) {
          identityId = this.dealDetails.sender?.id;
        } else {
          identityId = this.dealDetails.receiver?.id;
        }
        if (identityId && !this.fetchedRating) {
          this.fetchedRating = true;
          this.fetchUserRating(identityId);
        }
        if (this.dealDetails.requestedOffers && this.dealDetails.receivingBusinessInfo) {
          this.store.dispatch(DealActions.getReceiverOfferByUserId({ usertype: 'receiver', offerIds: this.dealDetails.requestedOffers, userId: this.dealDetails.receiver.id, businessId: this.receiverDetails?.identityId }));
        } else {
          this.store.dispatch(DealActions.getReceiverOfferByUserId({ usertype: 'receiver', offerIds: this.dealDetails.requestedOffers, userId: this.receiverDetails?.identityId, businessId: '' }));
        }
        if ((this.dealDetails.offeredOffers || this.dealDetails.requestedOffers) && this.dealDetails.sendingBusinessInfo) {
          this.store.dispatch(DealActions.getSenderOfferByUserId({ usertype: 'sender', offerIds: this.dealDetails.offeredOffers, userId: this.dealDetails.sender.id, businessId: this.senderDetails?.identityId }));
        } else {
          this.store.dispatch(DealActions.getSenderOfferByUserId({ usertype: 'sender', offerIds: this.dealDetails.offeredOffers, userId: this.senderDetails?.identityId, businessId: '' }));
        }
        if (dealDetails?.dealDeliveryMethod?.id == 'Junction') {
          this.store.dispatch(
            DealActions.updateJunction({ gintaaJunction: dealDetails.junctionView })
          )
          const meetDate = new Date(dealDetails.meetingDate);
          if (meetDate) {
            this.store.dispatch(
              DealActions.updateJunctionMeetingDate({
                meetingDate: meetDate
              })
            )
          }
          if (dealDetails.meetingStartTime && meetDate) {
            const time = dealDetails.meetingStartTime.split(':');
            const initialMeetingTime = new Date(
              meetDate.getFullYear(),
              parseInt((meetDate.getMonth()).toString().padStart(2, '0'), 10),
              meetDate.getDate(),
              parseInt(time[0], 10), parseInt(time[1], 10), 0);

            this.store.dispatch(
              DealActions.updateJunctionMeetingTime({
                meetingTime: initialMeetingTime
              })
            )
          }

        }
        if (this.dealDetails.requestedAmount) {
          this.requestObject.suggestRequestMoney.selected = true;
          this.suggestDealValidator.sender.invalid = false;
          if (this.dealDetails.callerIsReceiver) {
            this.requestObject.suggestRequestMoney.willPay = this.dealDetails.requestedAmountPaidByInitiatingUser ? '2' : '1';
          } else {
            this.requestObject.suggestRequestMoney.willPay = this.dealDetails.requestedAmountPaidByInitiatingUser ? '1' : '2';
          }
          this.requestObject.sender.giveMoney = true;
          this.requestObject.suggestRequestMoney.amount = this.dealDetails.requestedAmount;
          this.suggestDealValidator['amountValidation'].invalid = false;
        }
      } else {
        this.router.navigate([`/deals/details/${this.dealRefId}`]);
      }
    }
  }

  getDealDetails(dealRefId: string) {
    this.dealUpdateSubscriber = this.dealService.getDealDetails(dealRefId).subscribe(res => {
      if (res && res['payload']) {
        this.dealDetails = res['payload'];
        this.fetchDealSuccess(res['payload'])
      }
    }, err => {
    });
  }

  getUserOffer(offerId: string) {
    this.store.dispatch(
      DealActions.fetchUserOffer({ offerId: offerId })
    );
  }

  getMyOffer(userId: string) {
    this.store.dispatch(
      DealActions.fetchMyOffer({ isBusiness: this.senderDetails?.isBusiness, offerPerPage: this.offerPerPage, userId: userId })
    );
  }

  getUserDefaultAddress() {
    this.store.dispatch(
      DealActions.fetchUserAddress()
    );
  }

  onChange(data: any) {
    if (data['actionType'] == 'receiver') {
      let userAllOffer_temp = [...this.receiverSelectedOffers];
      const offerTempIndex = userAllOffer_temp.findIndex(offer => (offer.offerId == data.offerId));
      userAllOffer_temp.splice(offerTempIndex, 1, data.offer);
      this.store.dispatch(
        DealActions.updateReceiverAllOffer({ userData: userAllOffer_temp })
      );
    } else if (data['actionType'] == 'sender') {
      let myAllOffer_temp = [...this.senderSelectedOffers];
      const offerTempIndex = myAllOffer_temp.findIndex(offer => (offer.offerId == data.offerId));
      myAllOffer_temp.splice(offerTempIndex, 1, data.offer);
      this.store.dispatch(
        DealActions.updateSenderAllOffer({ userData: myAllOffer_temp })
      );
    }
  }

  getOfferFromAll(offerId, type = 'receiver') {
    if (type === 'receiver') {
      return this.receiverAllOffer.find(val => val.offerId == offerId);
    } else {
      return this.senderAllOffer.find(val => val.offerId == offerId);
    }
  }

  toggleMoneyOption(event: any) {
    this.whowillPayError = '';
    if (event.checked) {
      this.requestObject.suggestRequestMoney.selected = true;
      this.suggestDealValidator.sender.invalid = false;
    } else {
      this.requestObject.suggestRequestMoney.selected = false;
      this.requestObject.suggestRequestMoney.willPay = '';
      this.requestObject.suggestRequestMoney.amount = '';
    }
  }

  changeMoneyOption(event: any) {
    if (event.target.value) {
      this.whowillPayError = '';
    }
    this.requestObject.suggestRequestMoney.willPay = event.target.value;
  }

  onAmountChange(e: any) {
    this.errorMessage = '';
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.requestObject.suggestRequestMoney.amount = this.requestObject.suggestRequestMoney.amount;
      this.suggestDealValidator['amountValidation'].invalid = true;
      this.suggestDealValidator.sender.invalid = false;
      return false;
    } else {
      this.requestObject.sender.giveMoney = true;
      this.requestObject.suggestRequestMoney.amount = e.target.value;
      this.suggestDealValidator['amountValidation'].invalid = false;
      this.suggestDealValidator.sender.invalid = false;
    }
  }

  onPriceChangeChange(e: any) {
    this.maxAmountError = false;
    this.maxAmountMessage = null;
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      this.offerPrice = this.offerPrice;
      return false;
    } else {
      let value: any = parseFloat(e.target.value).toFixed(2);
      if (!isNaN(value)) {
        value = Number(value);
      }
      if (this.receiverofferDetails?.price) {
        if (e.target.value > this.receiverofferDetails?.price) {
          this.offerPrice = this.receiverofferDetails?.price;
          this.maxAmountError = true;
          this.maxAmountMessage = `Max Unit offer price should be ${this.receiverofferDetails?.price}`;
        } else {
          if (e.target.value == 0) {
            this.maxAmountError = true;
            this.maxAmountMessage = `Unit offer price should be greater than 0`;
          } else {
            this.offerPrice = value;
          }
        }
      }
      this.offerPrice = value;
    }
    this.calculatetotalAmount('money');
  }

  calculateInsurance(requestedAmount = 0) {
    this.selectedAssureAmount = (parseFloat(`${requestedAmount}`) * 2) / 100;
  }

  updateDeliverAddress(address: any) {
    this.deliveryAddress = address;
    this.callDeliveryMethod();
  }

  callDeliveryMethod(calledFrom = '') {
    if (calledFrom == 'offerLoad') {
      if (!this.shippingVendor?.courier_company_id) {
        this.calculateShipping = true;
        this.updateThirdPartyOption();
      }
    } else {
      this.calculateShipping = true;
      this.updateThirdPartyOption();
    }
  }

  updateThirdPartyOption() {
    let query = 'cod=0';
    let validation = true;
    if (this.receiverofferDetails?.location && this.receiverofferDetails.location?.zip) {
      query = `${query}&pickupPostCode=${this.receiverofferDetails.location.zip}`;
    } else {
      validation = false;
    }
    if (this.deliveryAddress?.zip) {
      query = `${query}&deliveryPostCode=${this.deliveryAddress.zip}`;
    } else {
      validation = false;
    }
    if (this.pageType != 'suggest' && this.dealDetails && this.dealDetails?.dealRefId && !this.dealDetails?.callerIsReceiver) {
      const dimension = this.dealDetails?.initiatorBoxDimension;
      if (dimension) {
        let arrayd = dimension.split('X');
        if (arrayd && Array.isArray(arrayd)) {
          this.dimension = {
            length: parseInt(arrayd[0]),
            breadth: parseInt(arrayd[1]),
            height: parseInt(arrayd[2]),
            weight: parseFloat(arrayd[3]),
          }
        }
      }
    }

    if (this.dimension && this.dimension?.breadth && this.dimension?.height && this.dimension?.length && this.dimension?.weight) {
      let weight = this.dimension.weight * 1;
      query = `${query}&weight=${weight}`;
      query = `${query}&length=${this.dimension.length}`;
      query = `${query}&breadth=${this.dimension.breadth}`;
      query = `${query}&height=${this.dimension.height}`;
    } else {
      validation = false;
    }
    if (validation) {
      this.deliverySubscriber = this.dealService.fetchThirdPartyVendor(query).subscribe(res => {
        if (res && res['payload'] && res['payload']['data'] && Array.isArray(res['payload']['data']['available_courier_companies']) && res['payload']['data']['available_courier_companies'].length) {
          this.shippingVendor = res['payload']['data']['available_courier_companies'][0];
        } else {
          this.shippingVendor = null;
        }
        this.calculatetotalAmount('money');
        this.errorMessage = null;
      }, err => {
        this.errorMessage = 'Product is not deliverable, please try after some time!';
      });
    } else {
      if (this.pageType == 'suggest') {
        this.calculateShipping = false;
      } else {
        if (this.dealDetails && this.dealDetails?.dealRefId && !this.dealDetails?.callerIsReceiver) {
          this.calculateShipping = false;
        }
      }
    }
  }

  updateDeliveryOption(event: MatRadioChange, thirdParty = '') {
    this.errorMessage = '';
    if (thirdParty != 'door') {
      this.deliveryMode = event.value;
      this.store.dispatch(
        DealActions.updateDeliveryMode({ deliveryMode: this.deliveryMode })
      );
      if (this.deliveryMode == this.availableDeliveryOptions[0] || this.deliveryMode == this.availableDeliveryOptions[2]) {
        this.thirdPartyDelivery = false;
        this.disableSuggestBtn = false;
        this.showTips = this.deliveryMode;
      } else {
        this.thirdPartyDelivery = true;
        if (this.selectedThirdPartyOption == 'IndiaPost') {
          this.disableSuggestBtn = false;
          this.showTips = 'IndiaPost';
        } else {
          if (this.dealDetails && this.dealDetails?.callerIsReceiver && (!this.dimension?.widthVal || !this.dimension?.heightVal || !this.dimension?.lengthVal || !this.dimension?.weight)) {
            this.disableSuggestBtn = true;
          } else {
            this.disableSuggestBtn = false;
          }
          this.showTips = this.selectedThirdPartyOption;
        }
      }
    } else {
      if (event.value == 'IndiaPost') {
        this.showTips = 'IndiaPost';
        this.disableSuggestBtn = false;
      } else {
        if (this.dealDetails && this.dealDetails?.callerIsReceiver && (!this.dimension?.widthVal || !this.dimension?.heightVal || !this.dimension?.lengthVal || !this.dimension?.weight)) {
          this.disableSuggestBtn = true;
        } else {
          this.disableSuggestBtn = false;
        }
        this.showTips = this.selectedThirdPartyOption;
      }
    }
    this.calculatetotalAmount('money');
  }

  calculatetotalAmount(calculateFor = 'money') {
    if (calculateFor == 'money' && this.receiverofferDetails?.exchangeMode !== 'Auction') {
      let totalAmount = this.offerPrice;
      const selectedOffer = this.receiverSelectedOffers.find(val => val.offerId == this.receiverofferDetails['offerId']);
      if (selectedOffer) {
        totalAmount = totalAmount * selectedOffer['selectedQuantity'];
      }
      this.totalAmount = totalAmount;
      this.calculateInsurance(totalAmount);
    } else {
      let totalAmount = this.bidPrice;
      if (this.deliveryMode == this.availableDeliveryOptions[1]) {
        if (this.shippingVendor?.rate) {
          totalAmount = totalAmount + this.shippingVendor?.rate;
        }
        if (this.selectedAssureDelivery) {
          totalAmount = totalAmount + this.selectedAssureAmount;
        }
      }
      this.totalAmount = totalAmount;
      this.calculateInsurance(totalAmount);
    }
  }

  updateAssureDelivery(value) {
    this.selectedAssureDelivery = value;
    this.calculatetotalAmount('money');
  }

  openOfferDialog(actionType: string, clickedfrom = 'left') {
    const dialogConfig: MatDialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'gintaa-deal-component';
    dialogConfig.position = { top: '10px' };
    dialogConfig.height = 'auto';
    dialogConfig.width = '760px';
    dialogConfig.data = {
      offerPerPage: this.offerPerPage,
      actionType: actionType,
      userId: '',
      pageType: this.pageType,
      offerId: this.offerId,
      receiverName: '',
      clickedfrom: clickedfrom,
      callerIsReceiver: false
    };
    if (this.dealRefId) {
      if (actionType == 'receiver') {
        dialogConfig.data.userId = this.receiverDetails?.identityId;
        dialogConfig.data.receiverName = this.receiverDetails?.name;
        dialogConfig.data.callerIsReceiver = this.receiverDetails?.callerIsReceiver;
      } else {
        dialogConfig.data.userId = this.senderDetails?.identityId;
        dialogConfig.data.receiverName = this.senderDetails?.name;
        dialogConfig.data.callerIsReceiver = false;
      }
    } else {
      if (actionType == 'receiver') {
        dialogConfig.data.userId = this.receiverDetails?.identityId;
        dialogConfig.data.receiverName = this.receiverDetails?.name;
        dialogConfig.data.callerIsReceiver = false;
        dialogConfig.data.isBuniness = this.receiverDetails?.isBusiness;
      } else {
        dialogConfig.data.isBuniness = this.senderDetails?.isBusiness;
      }
    }

    const modalDialog = this.matDialog.open(DealOffersListPopupComponent, dialogConfig);
    modalDialog.afterClosed().subscribe((results) => {
      // do something with results
    });
  }

  onInitiateDeal() {
    if (this.receiverofferDetails?.exchangeMode == 'Money' || this.receiverofferDetails?.exchangeMode == 'Free' || this.receiverofferDetails?.exchangeMode == 'Auction') {
      if (this.receiverofferDetails?.exchangeMode == 'Auction') {
        if (this.isAuctionUser) {
          this.suggestDealMoney();
        } else {
          this.sharedService.showToaster('You are not authorised to make this offer', 'warning');
        }
      } else {
        this.suggestDealMoney();
      }
    } else {
      this.suggestDealAnyThing();
    }
  }

  suggestDealMoney() {
    let validForm = true;
    let message = '';
    const destination = this.getOfferData('destination');
    const receiverOfferFormat = [];
    if (destination && destination.offerId) {
      receiverOfferFormat.push(destination);
    } else {
      validForm = false;
      message = 'Please choose a valid product';
    }
    let totalAmount = 0;
    if (this.receiverofferDetails?.auctioned && this.receiverofferDetails?.auctionInfo) {
      totalAmount = this.receiverofferDetails?.auctionInfo?.buyOutPrice;
    } else {
      if (this.receiverofferDetails?.exchangeMode != 'Free') {
        totalAmount = this.receiverofferDetails?.negotiable ? this.offerPrice : this.receiverofferDetails?.price;
        if (totalAmount < 1) {
          validForm = false;
          this.maxAmountError = true;
          this.maxAmountMessage = `Unit offer price should be greater than 0`;
        } else if (this.receiverofferDetails?.price < totalAmount) {
          validForm = false;
          this.maxAmountError = true;
          this.maxAmountMessage = `Max Unit offer price should be ${this.receiverofferDetails?.price}`;
        }
      }
      totalAmount = totalAmount * destination['offerItemCount'];
    }

    const initiateDealRequestObject: InitiateDealRequestObject = {
      amountCurrency: this.requestObject.amountCurrency,
      dealRefNo: '',
      deliveryMethodId: this.selectedDeliveryOption,
      destinationOfferDetails: receiverOfferFormat,
      includeInsurance: false,
      sourceOfferDetails: [],
      expiryDate: this.requestObject.expiryDate,
      requestedAmount: totalAmount,
      requestedAmountPaidByInitiatingUser: true
    };
    if (this.selectedDeliveryOption === this.availableDeliveryOptions[2]) {
      initiateDealRequestObject.gintaaJunctionId = `${this.requestObject.gintaaJunctionId}`;
      initiateDealRequestObject.meetingDate = `${this.formatDate(this.requestObject.meetingDate)}`;
      initiateDealRequestObject.meetingEndTime = `${this.requestObject.meetingEndTime}`;
      initiateDealRequestObject.meetingStartTime = `${this.requestObject.meetingStartTime}`;
    }
    // setup the courier details
    if (this.selectedDeliveryOption === this.availableDeliveryOptions[1]) {
      if (this.selectedThirdPartyOption == this.availableDeliveryOptions[1]) {
        const pickupLocation = this.getOfferData('pickup');
        if (!pickupLocation?.mobile) {
          validForm = false;
          message = 'Currently not receiving order!';
        }
        let deliveryLocation = null;
        if (this.pageType == 'suggest' || !this.dealDetails?.callerIsReceiver) {
          deliveryLocation = this.getOfferData('deliver');
          if (!deliveryLocation?.mobile) {
            validForm = false;
            message = 'Please choose a valid address';
          }
        }
        const doorStepDeliveryInfo = {
          pickupLocation: pickupLocation,
          deliveryLocation: deliveryLocation,
          insuranceOpted: `${this.selectedAssureDelivery}`,
          insuranceAmount: `0`, //insuranceAmount
          courierId: '',
          courierName: '',
          shippingAmount: '',
          dimension: null,
        };
        if (this.dealDetails?.dealRefId && this.dealDetails?.callerIsReceiver) {
          if (this.zeroDimension.test(this.dealDetails.initiatorBoxDimension) || !this.dealDetails.initiatorBoxDimension) {
            if (this.dimension && this.dimension?.weight) {
              doorStepDeliveryInfo.dimension = this.dimension;
            } else {
              validForm = false;
              message = 'Currently not receiving order!'
            }
          }
        }
        if (this.pageType == 'suggest' && this.dimension && this.dimension?.height && this.dimension?.height > 0 && this.dimension?.weight && this.dimension?.weight > 0) {
          doorStepDeliveryInfo.dimension = this.dimension;
        } else if (this.pageType !== 'suggest' && this.dealDetails?.dealRefId && this.zeroDimension.test(this.dealDetails?.initiatorBoxDimension) || !this.dealDetails?.initiatorBoxDimension) {
          doorStepDeliveryInfo.dimension = this.dimension;
        }
        if (this.selectedAssureDelivery && totalAmount >= 5000) {
          doorStepDeliveryInfo.insuranceAmount = `${this.selectedAssureAmount}`;
          initiateDealRequestObject['includeInsurance'] = this.selectedAssureDelivery;
          initiateDealRequestObject['insuranceAmount'] = this.selectedAssureAmount;
        }
        if (this.isbusinessOffer) {
          doorStepDeliveryInfo.insuranceOpted = `false`;
          doorStepDeliveryInfo.insuranceAmount = `0`;
          initiateDealRequestObject['includeInsurance'] = false;
          initiateDealRequestObject['insuranceAmount'] = 0;
        }
        if (this.calculateShipping) {
          if (this.shippingVendor && this.shippingVendor?.courier_company_id) {
            doorStepDeliveryInfo.courierId = `${this.shippingVendor?.courier_company_id}`;
            doorStepDeliveryInfo.courierName = `${this.shippingVendor?.courier_name}`;
            doorStepDeliveryInfo.shippingAmount = `${this.shippingVendor?.rate}`;
          } else {
            validForm = false;
            message = 'Item is not deliverable at this pincode';
          }
        }
        initiateDealRequestObject.doorStepDeliveryInfo = doorStepDeliveryInfo;
      } else {
        initiateDealRequestObject['deliveryMethodId'] = this.selectedThirdPartyOption;
      }
    }
    if (validForm) {
      this.disableSuggestBtn = true;
      if (this.dealRefId) {
        initiateDealRequestObject.dealRefNo = this.dealRefId;
        initiateDealRequestObject.updateCounter = this.dealDetails.updateCounter + 1;
        this.dealService.reviseDeal(initiateDealRequestObject)
          .subscribe(res => {
            this.disableSuggestBtn = false;
            if (res && res['body'] && res['body']['payload'] && res['body']['payload']['dealRefId']) {
              const dealDetails = res['body']['payload'];
              this.orderSuccess(dealDetails, 'update');
            }
          },
            err => {
              this.disableSuggestBtn = false;
              let message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.SUGGEST_DEAL_FAILED) : localization.deal.SUGGEST_DEAL_FAILED)) : localization.deal.SUGGEST_DEAL_FAILED;
              if (err.error && Array.isArray(err.error?.payload)) {
                const deliveryAddressFailed = err.error?.payload.find(val => {
                  if (val['param'] && val['param'].indexOf('doorStepDeliveryInfo') != -1) {
                    const param = val['param'].split('.');
                    if (param && Array.isArray(param)) {
                      return param[0] == 'doorStepDeliveryInfo';
                    } else {
                      return false;
                    }
                  }
                });
                if (deliveryAddressFailed) {
                  message = 'There is some issue with selected delivery address please select other address'
                }
              }
              this.scrollToTop();
              this.sharedService.showToaster(message, 'warning');
              this.errorMessage = message;
            });
      } else {
        this.dealService.initiateDeal(initiateDealRequestObject)
          .subscribe(res => {
            this.disableSuggestBtn = false;
            if (res && res['body'] && res['body']['payload'] && res['body']['payload']['dealRefId']) {
              const dealDetails = res['body']['payload'];
              this.orderSuccess(dealDetails);
            }
          },
            err => {
              this.disableSuggestBtn = false;
              let message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.SUGGEST_DEAL_FAILED) : localization.deal.SUGGEST_DEAL_FAILED)) : localization.deal.SUGGEST_DEAL_FAILED;
              if (err.error && Array.isArray(err.error?.payload)) {
                const deliveryAddressFailed = err.error?.payload.find(val => {
                  if (val['param'] && val['param'].indexOf('doorStepDeliveryInfo') != -1) {
                    const param = val['param'].split('.');
                    if (param && Array.isArray(param)) {
                      return param[0] == 'doorStepDeliveryInfo';
                    } else {
                      return false;
                    }
                  }
                });
                if (deliveryAddressFailed) {
                  message = 'There is some issue with selected delivery address please select other address'
                }
              }
              this.scrollToTop();
              this.sharedService.showToaster(message, 'warning');
              this.errorMessage = message;
            });
      }
    } else {
      this.scrollToTop();
      this.errorMessage = message;
    }
  }

  getOfferData(dataType = 'destination') {
    if (dataType == 'destination') {
      const selectedOffer = this.receiverSelectedOffers.find(val => val.offerId == this.receiverofferDetails['offerId']);
      if (selectedOffer) {
        return {
          "offerId": this.receiverofferDetails?.offerId,
          "offerItemCount": selectedOffer['selectedQuantity'],
          "offerType": this.receiverofferDetails?.offerType,
        }
      } else {
        return null;
      }
    } else if (dataType == 'pickup') {
      return {
        "flatNo": this.receiverofferDetails.location?.flatNo,
        "addressLine": this.receiverofferDetails.location?.addressLine,
        "latitude": this.receiverofferDetails.location?.lat,
        "longitude": this.receiverofferDetails.location?.lng,
        "annotation": this.receiverofferDetails.location?.annotation,
        "email": this.receiverofferDetails.location?.email,
        "mobile": this.receiverofferDetails.location?.phoneNumber,
        "area": this.receiverofferDetails.location?.area,
        "city": this.receiverofferDetails.location?.city,
        "country": this.receiverofferDetails.location?.country,
        "landmark": this.receiverofferDetails.location?.landmark,
        "state": this.receiverofferDetails.location?.state,
        "zip": this.receiverofferDetails.location?.zip
      };
    } else if (dataType == 'deliver') {
      return {
        "flatNo": this.deliveryAddress?.flatNo,
        "addressLine": this.deliveryAddress?.addressLine,
        "latitude": this.deliveryAddress?.lat,
        "longitude": this.deliveryAddress?.lng,
        "annotation": this.deliveryAddress?.annotation,
        "email": this.deliveryAddress?.email,
        "mobile": this.deliveryAddress?.phoneNumber,
        "area": this.deliveryAddress?.area,
        "city": this.deliveryAddress?.city,
        "country": this.deliveryAddress?.country,
        "landmark": this.deliveryAddress?.landmark,
        "state": this.deliveryAddress?.state,
        "zip": this.deliveryAddress?.zip
      };
    } else if (dataType == 'dimension') {
      return this.receiverofferDetails.dimension;
    }
  }

  orderSuccess(data, action = 'suggest') {
    try {
      this.router.navigate([`/deals/details/${data.dealRefId}`], { state: { data, action } })
    } catch (err) {
    }
  }

  suggestDealAnyThing() {
    // format offer 
    const receiverOfferFormat = this.requestObject.receiver.selectedOffers.map((offer) => (
      {
        offerId: offer.offerId,
        offerItemCount: offer.selectedQuantity,
        offerType: offer.offerType
      }
    ));

    const senderOfferFormat = this.requestObject.sender.selectedOffers.map((offer) => (
      {
        offerId: offer.offerId,
        offerItemCount: offer.selectedQuantity,
        offerType: offer.offerType
      }
    ));

    // suggest deal request params
    const initiateDealRequestObject: InitiateDealRequestObject = {
      amountCurrency: this.requestObject.amountCurrency,
      dealRefNo: '',
      deliveryMethodId: this.selectedDeliveryOption,
      destinationOfferDetails: receiverOfferFormat,
      includeInsurance: this.requestObject.includeInsurance,
      sourceOfferDetails: senderOfferFormat,
      expiryDate: this.requestObject.expiryDate,
    };
    if (this.receiverofferDetails['exchangeMode'] == 'Free') {
      initiateDealRequestObject.requestedAmount = 0;
      initiateDealRequestObject.requestedAmountPaidByInitiatingUser = true;
    }
    if (this.dealRefId) {
      if (this.dealDetails.callerIsReceiver) {
        if (this.requestObject.suggestRequestMoney.willPay === '2') {
          initiateDealRequestObject.requestedAmountPaidByInitiatingUser = true;
        } else if (this.requestObject.suggestRequestMoney.willPay === '1') {
          initiateDealRequestObject.requestedAmountPaidByInitiatingUser = false;
        }
      } else {
        if (this.requestObject.suggestRequestMoney.willPay === '1') {
          initiateDealRequestObject.requestedAmountPaidByInitiatingUser = true;
        } else if (this.requestObject.suggestRequestMoney.willPay === '2') {
          initiateDealRequestObject.requestedAmountPaidByInitiatingUser = false;
        }
      }
    } else {
      if (this.requestObject.suggestRequestMoney.willPay === '1') {
        initiateDealRequestObject.requestedAmountPaidByInitiatingUser = true;
      } else if (this.requestObject.suggestRequestMoney.willPay === '2') {
        initiateDealRequestObject.requestedAmountPaidByInitiatingUser = false;
      }
    }
    // if no amount is given, no need to set the field
    if (this.requestObject.sender.giveMoney) {
      initiateDealRequestObject.requestedAmount = this.requestObject.suggestRequestMoney.amount;
    }

    // setup the jintaa junction details
    if (this.selectedDeliveryOption === this.availableDeliveryOptions[2]) {
      initiateDealRequestObject.gintaaJunctionId = `${this.requestObject.gintaaJunctionId}`;
      initiateDealRequestObject.meetingDate = `${this.formatDate(this.requestObject.meetingDate)}`;
      initiateDealRequestObject.meetingEndTime = `${this.requestObject.meetingEndTime}`;
      initiateDealRequestObject.meetingStartTime = `${this.requestObject.meetingStartTime}`;
    }

    // setup the courier details
    if (this.selectedDeliveryOption === this.availableDeliveryOptions[1]) {
      if (this.selectedThirdPartyOption == this.availableDeliveryOptions[1]) {
        const pickupLocation = this.getOfferData('pickup');
        const deliveryLocation = this.getOfferData('deliver');
        const doorStepDeliveryInfo = {
          pickupLocation: pickupLocation,
          deliveryLocation: deliveryLocation,
          insuranceOpted: `${this.requestObject.thirdPartyOption.insurance}`,
          insuranceAmount: `0`, //insuranceAmount
        };
        initiateDealRequestObject.doorStepDeliveryInfo = doorStepDeliveryInfo;
      }
      else {
        initiateDealRequestObject['deliveryMethodId'] = this.selectedThirdPartyOption;
      }
    }

    this.dealFormValid = true;
    for (const [key, value] of Object.entries(this.suggestDealValidator)) {
      if (value.required) {
        if (key === 'receiver') {
          if (receiverOfferFormat && receiverOfferFormat.length > 0) {
            this.suggestDealValidator[key].invalid = false;
          } else {
            this.suggestDealValidator[key].invalid = true;
            this.dealFormValid = false;
          }
        } else if (key === 'sender') {
          if (senderOfferFormat && senderOfferFormat.length > 0) {
            this.suggestDealValidator[key].invalid = false;
          } else if ((this.receiverofferDetails['exchangeMode'] == 'Free') || (this.requestObject.suggestRequestMoney.selected && this.requestObject.suggestRequestMoney.willPay === '1' && this.requestObject.suggestRequestMoney.amount > 0)) {
            this.suggestDealValidator[key].invalid = false;
          } else {
            if (this.dealRefId && this.requestObject.suggestRequestMoney.willPay === '2' && this.requestObject.suggestRequestMoney.amount > 0) {
              this.suggestDealValidator[key].invalid = false;
            } else {
              this.suggestDealValidator[key].invalid = true;
              this.dealFormValid = false;
            }
          }
        } else if (key === 'selectedDeliveryOption') {
          if (!this.selectedDeliveryOption) {
            this.suggestDealValidator[key].invalid = true;
            this.dealFormValid = false;
          } else if (this.selectedDeliveryOption == this.availableDeliveryOptions[1]) {
            for (const [key1, value1] of Object.entries(this.thirdPartyValidator)) {
              if (value1.required) {
                if (key1 == 'deliveryAddress') {
                  if (!this.deliveryAddress) {
                    this.thirdPartyValidator[key1].invalid = true;
                    this.dealFormValid = false;
                  } else {
                    this.thirdPartyValidator[key1].invalid = false;
                  }
                } else {
                  this.thirdPartyValidator[key1].invalid = false;
                }
              }
            }
            this.suggestDealValidator[key].invalid = false;
          } else if (this.selectedDeliveryOption == this.availableDeliveryOptions[2]) {
            for (const [key1, value1] of Object.entries(this.gintaaJunctionValidator)) {
              if (value1.required) {
                if (this.requestObject[key1] == 'meetingDate') {
                  if (!this.requestObject[key1]) {
                    this.gintaaJunctionValidator[key1].invalid = true;
                    this.dealFormValid = false;
                  } else {
                    this.gintaaJunctionValidator[key1].invalid = false;
                  }
                } else if (this.requestObject[key1] == 'meetingStartTime') {
                  if (!this.requestObject[key1]) {
                    this.gintaaJunctionValidator[key1].invalid = true;
                    this.dealFormValid = false;
                  } else {
                    const day1 = this.requestObject.meetingDate.getDay();
                    if (this.selectedJunction?.junctionTimings && this.selectedJunction.junctionTimings[this.junctionDays[day1]]) {
                      const today = this.selectedJunction.junctionTimings[this.junctionDays[day1]];
                      const closeTime1 = today.closeTime ? this.formatJunctionOpenCloseTime(today.closeTime) : '';
                      const openTime1 = today.openTime ? this.formatJunctionOpenCloseTime(today.openTime) : '';
                      if (closeTime1 && openTime1) {
                        const closeTime = closeTime1.split(':');
                        const openTime = openTime1.split(':');
                        if (closeTime && closeTime[0] && closeTime[1] && openTime && openTime[0] && openTime[1]) {
                          const selectedTimeHours1 = this.requestObject.meetingEndTime.split(':');
                          if (selectedTimeHours1 && selectedTimeHours1[0] && selectedTimeHours1[1]) {
                            const selectedTimeHours = parseInt(selectedTimeHours1[0]);
                            const selectedTimeMin = parseInt(selectedTimeHours1[1]);
                            let openTimeHrs = parseInt(openTime[0])
                            let closeTimeHrs = parseInt(closeTime[0])
                            if (openTime && openTime[2].indexOf('PM') !== -1) {
                              openTimeHrs = openTimeHrs + 12;
                            }
                            if (closeTime && closeTime[2].indexOf('PM') !== -1) {
                              closeTimeHrs = closeTimeHrs + 12;
                            }
                            if (selectedTimeHours >= openTimeHrs && (selectedTimeHours == openTimeHrs ? selectedTimeMin >= parseInt(openTime[1]) : true) && selectedTimeHours <= closeTimeHrs && (selectedTimeHours == closeTimeHrs ? selectedTimeMin <= parseInt(closeTime[1]) : true)) {
                              this.gintaaJunctionValidator[key1].invalid = false;
                            } else {
                              this.gintaaJunctionValidator[key1].invalid = true;
                            }
                          } else {
                            this.gintaaJunctionValidator[key1].invalid = true;
                          }
                        } else {
                          this.gintaaJunctionValidator[key1].invalid = true;
                        }
                      } else {
                        this.gintaaJunctionValidator[key1].invalid = true;
                      }
                    } else {
                      this.gintaaJunctionValidator[key1].invalid = true;
                    }
                  }
                } else {
                  if (!this.requestObject[key1]) {
                    this.gintaaJunctionValidator[key1].invalid = true;
                    this.dealFormValid = false;
                  } else {
                    this.gintaaJunctionValidator[key1].invalid = false;
                  }
                }
              }
            }
            this.suggestDealValidator[key].invalid = false;
          } else {
            this.suggestDealValidator[key].invalid = false;
          }
        } else {
          if (!this.requestObject[key]) {
            this.suggestDealValidator[key].invalid = true;
            this.dealFormValid = false;
          } else {
            this.suggestDealValidator[key].invalid = false;
          }
        }
      }
    }
    if (this.dealFormValid && initiateDealRequestObject.requestedAmount > 0 && this.requestObject.suggestRequestMoney.willPay == '') {
      this.whowillPayError = 'Please Select who will pay.';
      this.dealFormValid = false;
    }
    if (this.dealFormValid) {
      this.store.dispatch(DealActions.pageLoading());
      this.disableSuggestBtn = true;
      if (this.dealRefId) {
        initiateDealRequestObject.dealRefNo = this.dealRefId;
        initiateDealRequestObject.updateCounter = this.dealDetails.updateCounter + 1;
        this.dealService.reviseDeal(initiateDealRequestObject)
          .subscribe(res => {
            this.disableSuggestBtn = false;
            if (res && res['body'] && res['body']['payload'] && res['body']['payload']['dealRefId']) {
              const dealDetails = res['body']['payload'];
              this.orderSuccess(dealDetails, 'update');
            }
          },
            err => {
              this.disableSuggestBtn = false;
              let message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.SUGGEST_DEAL_FAILED) : localization.deal.SUGGEST_DEAL_FAILED)) : localization.deal.SUGGEST_DEAL_FAILED;
              if (err.error && Array.isArray(err.error?.payload)) {
                const deliveryAddressFailed = err.error?.payload.find(val => {
                  if (val['param'] && val['param'].indexOf('doorStepDeliveryInfo') != -1) {
                    const param = val['param'].split('.');
                    if (param && Array.isArray(param)) {
                      return param[0] == 'doorStepDeliveryInfo';
                    } else {
                      return false;
                    }
                  }
                });
                if (deliveryAddressFailed) {
                  message = 'There is some issue with selected delivery address please select other address'
                }
              }
              this.scrollToTop();
              this.sharedService.showToaster(message, 'warning')
            });
      } else {
        this.dealService.initiateDeal(initiateDealRequestObject)
          .subscribe(res => {
            this.disableSuggestBtn = false;
            if (res && res['body'] && res['body']['payload'] && res['body']['payload']['dealRefId']) {
              const dealDetails = res['body']['payload'];
              this.orderSuccess(dealDetails);
            }
          },
            err => {
              this.disableSuggestBtn = false;
              let message = err.error ? (err.error?.message ? err.error?.message : (err.error?.payload ? (err.error?.payload[0]?.errorDetailedReason ? err.error?.payload[0]?.errorDetailedReason : localization.deal.SUGGEST_DEAL_FAILED) : localization.deal.SUGGEST_DEAL_FAILED)) : localization.deal.SUGGEST_DEAL_FAILED;
              if (err.error && Array.isArray(err.error?.payload)) {
                const deliveryAddressFailed = err.error?.payload.find(val => {
                  if (val['param'] && val['param'].indexOf('doorStepDeliveryInfo') != -1) {
                    const param = val['param'].split('.');
                    if (param && Array.isArray(param)) {
                      return param[0] == 'doorStepDeliveryInfo';
                    } else {
                      return false;
                    }
                  }
                });
                if (deliveryAddressFailed) {
                  message = 'There is some issue with selected delivery address please select other address'
                }
              }
              this.scrollToTop();
              this.sharedService.showToaster(message, 'warning')
            });
      }
    }
  }

  formatJunctionOpenCloseTime(junctionTime: string): string {
    // expecting in 24 hour format - 01:00:00
    let time = junctionTime.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [junctionTime];
    if (time.length > 1) {
      time = time.slice(1);
      time[4] = +time[0] < 12 ? ' AM' : ' PM';
      time[0] = String(+time[0] % 12 || 12);
    }
    return time.join('');
  }

  ngOnDestroy() {
    try {
      this.store.dispatch(
        DealActions.emptyInitiateData()
      );
      this.dealStateSubscriber.unsubscribe();
      this.dealUpdateSubscriber.unsubscribe();
    } catch (e) {
    }
    try {
      this.bidSubscription.unsubscribe();
    } catch (e) {
    }
  }

  formatDate(date: string) {
    return date.replace(/-/g, '');
  }

  showWillPay(value) {
    if (this.pageType == 'suggest') {
      if (value == 1) {
        return true;
      } else {
        if (this.requestObject.sender.selectedOffers) {
          return this.requestObject.sender.selectedOffers.length;
        } else {
          return false;
        }
      }
    } else {
      if (this.dealDetails && this.dealDetails?.dealRefId) {
        if (this.dealDetails?.callerIsReceiver) {
          if (value == 2) {
            return true;
          } else {
            if (this.requestObject.sender.selectedOffers) {
              return this.requestObject.sender.selectedOffers.length;
            } else {
              return false;
            }
          }
        } else {
          if (value == 1) {
            return true;
          } else {
            if (this.requestObject.sender.selectedOffers) {
              return this.requestObject.sender.selectedOffers.length;
            } else {
              return false;
            }
          }
        }
      } else {
        return true;
      }
    }
  }

  updateDimension(data) {
    this.dimension = {
      breadth: data?.widthVal,
      height: data?.heightVal,
      length: data?.lengthVal,
      weight: data?.weight
    };
    if (data?.widthVal && data?.heightVal && data?.lengthVal && data?.weight) {
      this.disableSuggestBtn = false;
    } else {
      this.disableSuggestBtn = true;
    }
  }

  showDoorStepDelivery(showpost = '') {
    if (showpost == 'message') {
      if (this.pageType == 'suggest') {
        if (this.selectedDeliveryOption === this.availableDeliveryOptions[1]) {
          return this.selectedThirdPartyOption != this.availableDeliveryOptions[1];
        } else {
          return false;
        }
      } else {
        return this.selectedThirdPartyOption == this.availableDeliveryOptions[3];
      }
    } else if (showpost == 'updateDimension') {
      if (this.pageType == 'suggest') {
        return false;
      } else {
        if (this.dealDetails && this.dealDetails?.dealRefId && this.dealDetails?.callerIsReceiver && this.selectedDeliveryOption == this.availableDeliveryOptions[1] && this.selectedThirdPartyOption == this.availableDeliveryOptions[1] && (this.zeroDimension.test(this.dealDetails.initiatorBoxDimension) || !this.dealDetails.initiatorBoxDimension)) {
          return true
        } else {
          return false;
        }
      }
    } else {
      if (this.pageType == 'suggest') {
        if (this.selectedDeliveryOption === this.availableDeliveryOptions[1]) {
          return this.selectedThirdPartyOption == this.availableDeliveryOptions[1];
        } else {
          return false;
        }
      } else {
        if (this.dealDetails && this.dealDetails?.dealRefId && this.dealDetails?.callerIsReceiver) {
          return false
        } else {
          if (this.selectedDeliveryOption === this.availableDeliveryOptions[1]) {
            return this.selectedThirdPartyOption == this.availableDeliveryOptions[1]
          } else {
            return false;
          }
        }
      }
    }
  }

  showDeliveryPreference() {
    let data1 = this.requestObject.receiver.selectedOffers.some((offer) => offer.offerType == 'Item');
    let data2 = this.requestObject.sender.selectedOffers.some((offer) => offer.offerType == 'Item');
    if (data1 || data2) {
      return true;
    } else {
      this.selectedDeliveryOption = 'Self';
      return false;
    }
  }

  fetchUserRating(userId: string) {
    this.dealService.getUserRating(userId)
      .subscribe(result => {
        if (result && result['payload'] && result['payload']['averageRating']) {
          this.averageRating = parseFloat(result['payload']['averageRating']).toFixed(1);
        }
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

}
