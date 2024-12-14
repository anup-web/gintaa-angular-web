import { Component, OnInit, PLATFORM_ID, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@gintaa/core/services/auth.service';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { Subscription } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '@gintaa/env';

declare var Razorpay: any;

@Component({
  selector: 'app-deal-checkout',
  templateUrl: './deal-checkout.component.html',
  styleUrls: ['./deal-checkout.component.scss']
})
export class DealCheckoutComponent implements OnInit {

  selectedAddress: any;
  offerSubscriber: Subscription;
  deliverySubscriber: Subscription;
  offerId: string;
  disableSuggestBtn: boolean = true;
  selectedOfferDetail: any;
  itemQuantity: number = 1;
  maxitemQuantity: number = 1;
  minitemQuantity: number = 1;
  errormessage: string = '';
  shippingVendor: any;
  dealDetails: any = null;
  razorpay_option_key = environment.razorpay_option_key;

  requestObjectBuyOut = {
    "amountCurrency": "INR",
    "requestedAmount": '',
    "destinationOfferDetails": null,
    "expiryDate": "20220101 12",
    "includeInsurance": false,
    "insuranceAmount": "0",
    "doorStepDeliveryInfo": {
      "pickupLocation": null,
      "deliveryLocation": null,
      "dimension": null,
      "courierId": "",
      "courierName": "",
      "shippingAmount": ''
    }
  }

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
    private authService: AuthService,
    private dealService: DealService,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.offerId = params.get("id");
    });
    const isAuth = this.authService.isAuthenticated();
    if (!isAuth) {
      this.router.navigate(['/home']);
    } else {
      if (this.offerId) {
        this.getOfferDetails();
      }
    }
  }

  getOfferDetails() {
    this.offerSubscriber = this.dealService.getUserOffer(this.offerId).subscribe(res => {
      if (res && Array.isArray(res) && res.length && res[0]['offerId']) {
        this.selectedOfferDetail = res[0];
        // if(res[0]['quantity'] > 5){
        //   this.maxitemQuantity = 5;
        // } else {
          this.maxitemQuantity = res[0]['quantity'];
        //}
        if(res[0]['moq'] && res[0]['moq'] < res[0]['quantity']){
          this.minitemQuantity = res[0]['quantity'] ? res[0]['quantity'] : 1;
        } else {
          this.minitemQuantity = res[0]['moq'] ? res[0]['moq'] : 1;
        }
        this.itemQuantity = this.minitemQuantity;
        // if (this.selectedOfferDetail?.dimensions && Array.isArray(this.selectedOfferDetail.dimensions)) {
        //   this.selectedOfferDetail.dimensions.map(val => {
        //     if (this.maxitemQuantity < val?.quantity) {
        //       this.maxitemQuantity = val?.quantity;
        //     }
        //   })
        // }
        this.callDeliveryMethod('offerLoad');
      } else {
        this.selectedOfferDetail = null;
      }
    }, err => {
    });
  }

  updateDeliverAddress(address: any) {
    this.selectedAddress = address;
    this.callDeliveryMethod();
  }

  updateQuantity(actionType = 'add') {
    if (actionType == 'add') {
      this.itemQuantity = this.itemQuantity + 1;
      //this.updateThirdPartyOption();
    } else if (this.itemQuantity > 1) {
      this.itemQuantity = this.itemQuantity - 1;
      //this.updateThirdPartyOption();
    }
  }

  callDeliveryMethod(calledFrom = '') {
    if (calledFrom == 'offerLoad') {
      if (!this.shippingVendor?.courier_company_id) {
        this.updateThirdPartyOption();
      }
    } else {
      this.updateThirdPartyOption();
    }
  }

  updateThirdPartyOption() {
    this.disableSuggestBtn = true;
    let query = 'cod=0';
    let validation = true;
    if (this.selectedOfferDetail?.location && this.selectedOfferDetail.location?.zip) {
      query = `${query}&pickupPostCode=${this.selectedOfferDetail.location.zip}`;
    } else {
      validation = false;
    }
    if (this.selectedAddress?.zip) {
      query = `${query}&deliveryPostCode=${this.selectedAddress.zip}`;
    } else {
      validation = false;
    }
    const dimension = this.getOfferData('dimension')
    if (dimension && dimension?.breadth && dimension?.height && dimension?.length && dimension?.weight) {
      let weight = dimension.weight * this.itemQuantity;
      query = `${query}&weight=${weight}`;
      query = `${query}&length=${dimension.length}`;
      query = `${query}&breadth=${dimension.breadth}`;
      query = `${query}&height=${dimension.height}`;
    } else {
      validation = false;
    }
    if (validation) {
      this.deliverySubscriber = this.dealService.fetchThirdPartyVendor(query).subscribe(res => {
        if (res && res['payload'] && res['payload']['data'] && Array.isArray(res['payload']['data']['available_courier_companies']) && res['payload']['data']['available_courier_companies'].length) {
          this.disableSuggestBtn = false;
          this.shippingVendor = res['payload']['data']['available_courier_companies'][0];
        } else {
          this.shippingVendor = null;
        }
        this.errormessage = null;
      }, err => {
        this.disableSuggestBtn = true;
        this.errormessage = 'Currently not receiving order please try again!';
      });
    }
  }

  navigateToOffer(offerId) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }

  getTotalPayableAmount() {
    if (this.selectedOfferDetail?.price) {
      let amount = this.selectedOfferDetail?.price * this.itemQuantity;
      return amount;
    } else {
      return '';
    }
  }

  getOfferData(dataType = 'destination') {
    if (dataType == 'destination') {
      return {
        "offerId": this.selectedOfferDetail?.offerId,
        "offerItemCount": this.itemQuantity,
        "offerType": this.selectedOfferDetail?.offerType,
      }
    } else if (dataType == 'pickup') {
      return {
        "flatNo": this.selectedOfferDetail.location?.flatNo,
        "addressLine": this.selectedOfferDetail.location?.addressLine,
        "latitude": this.selectedOfferDetail.location?.lat,
        "longitude": this.selectedOfferDetail.location?.lng,
        "annotation": this.selectedOfferDetail.location?.annotation,
        "email": this.selectedOfferDetail.location?.email,
        "mobile": this.selectedOfferDetail.location?.phoneNumber,
        "area": this.selectedOfferDetail.location?.area,
        "city": this.selectedOfferDetail.location?.city,
        "country": this.selectedOfferDetail.location?.country,
        "landmark": this.selectedOfferDetail.location?.landmark,
        "state": this.selectedOfferDetail.location?.state,
        "zip": this.selectedOfferDetail.location?.zip
      };
    } else if (dataType == 'deliver') {
      return {
        "flatNo": this.selectedAddress?.flatNo,
        "addressLine": this.selectedAddress?.addressLine,
        "latitude": this.selectedAddress?.lat,
        "longitude": this.selectedAddress?.lng,
        "annotation": this.selectedAddress?.annotation,
        "email": this.selectedAddress?.email,
        "mobile": this.selectedAddress?.phoneNumber,
        "area": this.selectedAddress?.area,
        "city": this.selectedAddress?.city,
        "country": this.selectedAddress?.country,
        "landmark": this.selectedAddress?.landmark,
        "state": this.selectedAddress?.state,
        "zip": this.selectedAddress?.zip
      };
    } else if (dataType == 'dimension') {
      let dimension = null;
      if (this.selectedOfferDetail?.dimensions && Array.isArray(this.selectedOfferDetail.dimensions)) {
        dimension = this.selectedOfferDetail.dimensions[0]
        //dimension = this.selectedOfferDetail.dimensions.find(val => this.itemQuantity == val?.quantity)
      }
      return dimension;
    }
  }

  buyout() {
    if (this.dealDetails?.dealRefId) {
      this.registerPaymentCall()
    } else {
      this.callDirectBuy()
    }
  }

  callDirectBuy() {
    let validForm = true;
    let message = ''
    const amount = this.getTotalPayableAmount();
    if (amount) {
      this.requestObjectBuyOut.requestedAmount = `${amount}`;
    } else {
      validForm = false;
      message = 'Payable amount must be greater than 0'
    }
    const destination = this.getOfferData('destination');
    if (destination && destination.offerId) {
      this.requestObjectBuyOut.destinationOfferDetails = destination;
    } else {
      validForm = false;
      message = 'Please choose a valid item'
    }
    const pickupLocation = this.getOfferData('pickup');
    if (pickupLocation && pickupLocation.mobile) {
      this.requestObjectBuyOut.doorStepDeliveryInfo.pickupLocation = pickupLocation;
    } else {
      validForm = false;
      message = 'Currently not receiving order!'
    }
    const deliveryLocation = this.getOfferData('deliver');
    if (deliveryLocation && deliveryLocation.mobile) {
      this.requestObjectBuyOut.doorStepDeliveryInfo.deliveryLocation = deliveryLocation;
    } else {
      validForm = false;
      message = 'Please choose a valid address'
    }
    const dimension = this.getOfferData('dimension');
    if (dimension && dimension?.weight) {
      this.requestObjectBuyOut.doorStepDeliveryInfo.dimension = dimension;
    } else {
      validForm = false;
      message = 'Currently not receiving order!'
    }

    if (this.shippingVendor && this.shippingVendor?.courier_company_id) {
      this.requestObjectBuyOut.doorStepDeliveryInfo.courierId = `${this.shippingVendor?.courier_company_id}`;
      this.requestObjectBuyOut.doorStepDeliveryInfo.courierName = `${this.shippingVendor?.courier_name}`;
      const shippingCost = this.shippingVendor?.rate * this.itemQuantity;
      this.requestObjectBuyOut.doorStepDeliveryInfo.shippingAmount = `${shippingCost}`;
    } else {
      validForm = false;
      message = 'Item is not deliverable at this pincode';
    }

    if (validForm) {
      this.errormessage = null;
      this.dealDetails = null;
      this.disableSuggestBtn = true;
      this.dealService.buyOut(this.requestObjectBuyOut).subscribe(res => {
        if (res && res['body'] && res['body']['payload'] && res['body']['payload']['dealRefId']) {
          this.dealDetails = res['body']['payload'];
          this.disableSuggestBtn = false;
          this.registerPaymentCall();
        } else {
          this.disableSuggestBtn = false;
          this.errormessage = 'Currently not receiving order please try again!';
        }
      }, err => {
        this.disableSuggestBtn = false;
        if (err && err?.error && err?.error?.message) {
          this.errormessage = err.error.message;
        } else {
          this.errormessage = 'Currently not receiving order please try again!';
        }
      });
    } else {
      this.errormessage = message;
    }
  }

  registerPaymentCall() {
    this.dealService.registerPayment(this.dealDetails?.dealRefId).subscribe(response => {
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
          let contact = userdata ? (userdata?.phoneNumber ? userdata?.phoneNumber : '') : '';
          if(contact){
            contact = contact.replace("+91", '');
          }
          this.razorpayOptions["prefill"].contact = contact
          this.razorpayOptions["prefill"].email = userdata ? (userdata?.email ? userdata?.email : '') : '';
          var rzp1 = new Razorpay(this.razorpayOptions);
          rzp1.open();
        } else {
          this.errormessage = 'Currently not receiving order please try again!';
        }
      } else {
        this.errormessage = 'Unable to proceed for payment, please try again!';
        this.orderSuccess();
      }
    }, err => {
      this.errormessage = 'Unable to proceed for payment, please try again!';
      this.orderSuccess();
    });
  }

  orderSuccess() {
    this.router.navigate([`/deals/order-success/${this.dealDetails.dealRefId}`], { state: { data: this.dealDetails, status: 'failed', deliverydate: this.shippingVendor?.estimated_delivery_days } });
  }

  razorPayHandler = (response) => {
    if (response) {
      if (response?.razorpay_order_id && response?.razorpay_signature) {
        this.router.navigate([`/deals/order-success/${this.dealDetails.dealRefId}`], { state: { data: this.dealDetails, status: 'success', deliverydate: this.shippingVendor?.estimated_delivery_days } })
      } else {
        this.router.navigate([`/deals/order-success/${this.dealDetails.dealRefId}`], { state: { data: this.dealDetails, status: 'failed', deliverydate: this.shippingVendor?.estimated_delivery_days } })
      }
    }
  };

}
