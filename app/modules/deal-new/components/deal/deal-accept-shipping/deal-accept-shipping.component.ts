import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { DealService } from '@gintaa/modules/deal-new/services/deal.service';
import { SharedService } from '@gintaa/shared/services/shared.service';

@Component({
  selector: 'app-deal-accept-shipping',
  templateUrl: './deal-accept-shipping.component.html',
  styleUrls: ['./deal-accept-shipping.component.scss']
})
export class dealAcceptShippingComponent implements OnInit {

  selectedPackage: string = '';
  selectedPackageCustom: any = { lengthVal: 1, heightVal: 1, widthVal: 1 };
  @Input('packingList') packingList: any;
  @Input('page') page: string = 'accept';
  @Input('calledFromAccept') calledFromAccept: boolean = false;
  @Input('dealDetails') dealDetails: any;
  @Output("acceptDeal") acceptDeal: EventEmitter<any> = new EventEmitter();
  @Output("updateDimension") updateDimension: EventEmitter<any> = new EventEmitter();
  lengthVal: number = 1;
  heightVal: number = 1;
  widthVal: number = 1;
  selectedWeight: number = 0;
  selectedWeightKg: number = 1.00;
  validform: boolean = false;
  errorMessage: string = '';
  deliveryAddress: any = null;
  pickupLocation: any = null;
  shippingVendor: any;
  selectedAssureDelivery: boolean = false;
  selectedAssureAmount: number = 0;
  dimension: any = {
    length: null,
    breadth: null,
    height: null,
    weight: null
  }
  constructor(
    private dealService: DealService,
    public sharedService: SharedService,
  ) { }

  ngOnInit(): void {
    this.deliveryAddress = this.dealDetails?.initiatorDeliveryAddress;
    this.pickupLocation = this.dealDetails?.initiatorPickupAddress;
    this.calculateInsurance();
  }

  calculateInsurance() {
    if(this.dealDetails?.requestedAmount >= 5000){
      this.selectedAssureDelivery = true
    }
    this.selectedAssureAmount = (parseFloat(this.dealDetails?.requestedAmount) * 2) / 100;
  }

  onInputChangePackage(e, type) {
    const charCode = (e.which) ? e.which : e.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      if (type == 'lengthVal') {
        this.selectedPackageCustom.lengthVal = this.selectedPackageCustom.lengthVal;
      } else if (type == 'heightVal') {
        this.selectedPackageCustom.heightVal = this.selectedPackageCustom.heightVal;
      } if (type == 'widthVal') {
        this.selectedPackageCustom.widthVal = this.selectedPackageCustom.widthVal;
      }
      if (this.page == 'revise' && this.dealDetails?.callerIsReceiver) {
        setTimeout(() => {
          this.updateThirdPartyOption(false);
        }, 0);
      }
      return false;
    } else {
      const value = parseInt(e.target.value, 10) *1;
      if (type == 'lengthVal') {
        this.lengthVal = value
      } else if (type == 'heightVal') {
        this.heightVal = value
      } if (type == 'widthVal') {
        this.widthVal = value
      }
    }
    setTimeout(() => {
      this.updateThirdPartyOption(false);
    }, 0);
  }

  setPackage(event) {
    this.selectedPackage = event.value;
    this.updateThirdPartyOption(false);
  }

  onInputChange(event, type = 'slider') {
    if (type === 'slider') {
      this.selectedWeightKg = event.value / 1000;
    } else {
      const value = event?.target?.value
      if (value) {
        const valuet = parseFloat(value)
        if(isNaN(valuet) || Math.sign(valuet) == -1 || Math.sign(valuet) == 0 || valuet < 0.5){
          this.selectedWeightKg = 0.5;
        } else {
          if (value.indexOf('.') !== -1) {
            let floatPart = value.split('.');
            if (floatPart && floatPart[1].length <= 2) {
              this.selectedWeightKg = value;
            } else if (floatPart) {
              let floatright: string = floatPart[1];
              let number = floatPart[0] + '.' + floatright.slice(0, 2);
              this.selectedWeightKg = parseFloat(number);
            }
          }
        }
      }
    }
    this.updateThirdPartyOption(false);
  }

  updateThirdPartyOption(callApi = true) {
    let message = '';
    let query = 'cod=0';
    let validation = true;
    let customPackage = { lengthVal: 0, heightVal: 0, widthVal: 0, weight: 0 };
    if (this.dealDetails?.callerIsReceiver) {
      if (this.selectedPackage == '1') {
        customPackage.lengthVal = 30;
        customPackage.heightVal = 30;
        customPackage.widthVal = 30;
      } else if (this.selectedPackage == '2') {
        customPackage.lengthVal = 60;
        customPackage.heightVal = 60;
        customPackage.widthVal = 60;
      } else if (this.selectedPackage == '3') {
        customPackage.lengthVal = 180;
        customPackage.heightVal = 180;
        customPackage.widthVal = 180;
      } else {
        customPackage.lengthVal = this.lengthVal;
        customPackage.heightVal = this.heightVal;
        customPackage.widthVal = this.widthVal;
      }
      if (this.selectedWeightKg) {
        customPackage.weight = this.selectedWeightKg;
      } else {
        validation = false;
        message = 'Please select Item weight';
      }
    } else {
      const dimension = this.dealDetails?.initiatorBoxDimension;
      if (dimension) {
        let arrayd = dimension.split('X');
        if (arrayd && Array.isArray(arrayd)) {
          customPackage.lengthVal = parseInt(arrayd[0]);
          customPackage.heightVal = parseInt(arrayd[1]);
          customPackage.widthVal = parseInt(arrayd[2]);
          customPackage.weight = parseFloat(arrayd[3]);
        }
      }
    }

    if (customPackage.lengthVal && customPackage.widthVal && customPackage.heightVal && customPackage.weight) {
      query = `${query}&length=${customPackage.lengthVal}`;
      query = `${query}&breadth=${customPackage.widthVal}`;
      query = `${query}&height=${customPackage.heightVal}`;
      query = `${query}&weight=${customPackage.weight}`;
      this.dimension.length = customPackage?.lengthVal;
      this.dimension.breadth = customPackage?.widthVal;
      this.dimension.height = customPackage?.heightVal;
      this.dimension.weight = customPackage?.weight
    } else {
      validation = false;
      message = 'Please select Valid Item dimension';
    }
    if (this.deliveryAddress?.zip) {
      query = `${query}&deliveryPostCode=${this.deliveryAddress.zip}`;
    } else {
      message = 'Please ask initiator for Valid Delivery location';
      validation = false;
    }
    if (this.pickupLocation?.zip) {
      query = `${query}&pickupPostCode=${this.pickupLocation.zip}`;
    } else {
      message = 'Please select Valid Pickup location';
      validation = false;
    }
    if (!callApi) {
      this.validform = validation
    } else if (!this.dealDetails?.callerIsReceiver) {
      this.validform = validation
    }

    if (this.page == 'revise' && this.dealDetails?.callerIsReceiver) {
      this.updateDimension.emit(customPackage);
    } else {
      if (validation && callApi) {
        this.callShipping(query);
      } else {
        if (callApi) {
          message = 'Please ask initiator for Valid Delivery location';
          if (message) {
            this.sharedService.showToaster(message, 'warning')
          }
        }
      }
    }
  }

  acceptSender() {
    const deliveryAddress = {
      "flatNo": this.deliveryAddress?.flatNo,
      "addressLine": this.deliveryAddress?.addressLine,
      "latitude": this.deliveryAddress?.lat,
      "longitude": this.deliveryAddress?.lng,
      "annotation": this.deliveryAddress?.annotation,
      "email": this.deliveryAddress?.email,
      "mobile": this.deliveryAddress?.mobile ? this.deliveryAddress?.mobile : this.deliveryAddress?.phoneNumber,
      "area": this.deliveryAddress?.area,
      "city": this.deliveryAddress?.city,
      "country": this.deliveryAddress?.country,
      "landmark": this.deliveryAddress?.landmark,
      "state": this.deliveryAddress?.state,
      "zip": this.deliveryAddress?.zip
    }
    const doorStepDeliveryInfo = {
      pickupLocation: this.pickupLocation,
      deliveryLocation: deliveryAddress,
      dimension: this.dimension,
      courierId: '',
      courierName: '',
      shippingAmount: '',
      insuranceOpted: this.selectedAssureDelivery,
      insuranceAmount: ''
    };
    if (this.shippingVendor && this.shippingVendor?.courier_company_id) {
      doorStepDeliveryInfo.courierId = `${this.shippingVendor?.courier_company_id}`;
      doorStepDeliveryInfo.courierName = `${this.shippingVendor?.courier_name}`;
      doorStepDeliveryInfo.shippingAmount = `${this.shippingVendor?.rate}`;
      if (this.selectedAssureDelivery) {
        doorStepDeliveryInfo.insuranceAmount = `${this.selectedAssureAmount}`;
      }
      this.acceptDeal.emit(doorStepDeliveryInfo);
    }
  }

  formatLabel(value: number) {
    if (value >= 1000) {
      const weight = value / 1000;
      return weight.toFixed(1) + 'k';
    }
    return value;
  }

  updateDeliverAddress(address: any) {
    this.deliveryAddress = address;
    this.updateThirdPartyOption(true);
  }

  updateAssureDelivery(value) {
    this.selectedAssureDelivery = value;
  }

  selectPackage() {
    if (this.page == 'details') {
      if (this.dealDetails && this.dealDetails?.callerIsReceiver) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }

  callShipping(query = '') {
    const deliveryAddress = {
      "flatNo": this.deliveryAddress?.flatNo,
      "addressLine": this.deliveryAddress?.addressLine,
      "latitude": this.deliveryAddress?.lat,
      "longitude": this.deliveryAddress?.lng,
      "annotation": this.deliveryAddress?.annotation,
      "email": this.deliveryAddress?.email,
      "mobile": this.deliveryAddress?.mobile ? this.deliveryAddress?.mobile : this.deliveryAddress?.phoneNumber,
      "area": this.deliveryAddress?.area,
      "city": this.deliveryAddress?.city,
      "country": this.deliveryAddress?.country,
      "landmark": this.deliveryAddress?.landmark,
      "state": this.deliveryAddress?.state,
      "zip": this.deliveryAddress?.zip
    }
    const doorStepDeliveryInfo = {
      pickupLocation: this.pickupLocation,
      deliveryLocation: deliveryAddress,
      dimension: this.dimension,
      courierId: '',
      courierName: '',
      shippingAmount: '',
      insuranceOpted: this.dealDetails?.includeInsurance,
      insuranceAmount: this.dealDetails?.insuranceAmount
    };

    this.dealService.fetchThirdPartyVendor(query).subscribe(res => {
      if (res && res['payload'] && res['payload']['data'] && Array.isArray(res['payload']['data']['available_courier_companies']) && res['payload']['data']['available_courier_companies'].length) {
        const shippingVendor = res['payload']['data']['available_courier_companies'][0];
        this.shippingVendor = shippingVendor;
        this.errorMessage = null;
        if (this.dealDetails?.callerIsReceiver) {
          if (shippingVendor && shippingVendor?.courier_company_id) {
            doorStepDeliveryInfo.courierId = `${shippingVendor?.courier_company_id}`;
            doorStepDeliveryInfo.courierName = `${shippingVendor?.courier_name}`;
            doorStepDeliveryInfo.shippingAmount = `${shippingVendor?.rate}`;
            this.acceptDeal.emit(doorStepDeliveryInfo);
          } else {
            this.errorMessage = 'Delivery is not available for buyer address!';
          }
        } else if (!shippingVendor?.courier_company_id) {
          this.errorMessage = 'Delivery is not available for this address!';
        }
      } else {
        this.validform = false;
        if (this.dealDetails?.callerIsReceiver) {
          this.errorMessage = 'Delivery is not available for buyer address, Please connect with him for different address!';
        } else {
          this.errorMessage = 'Delivery is not available, Please connect with seller!';
        }
      }
    }, err => {
      this.errorMessage = 'Currently not receiving order please try again!';
    });
  }
}
