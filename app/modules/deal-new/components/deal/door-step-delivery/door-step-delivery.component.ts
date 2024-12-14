import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { AuthService } from '@gintaa/core/services';
import { Subscription } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import {NewAddressComponent} from '@gintaa/shared/components/new-address/new-address.component';

@Component({
  selector: 'app-door-step-delivery',
  templateUrl: './door-step-delivery.component.html',
  styleUrls: ['./door-step-delivery.component.scss']
})
export class DoorStepDeliveryComponent implements OnInit {

  addressList: any = [];
  addressSubscriber: Subscription;
  selectedAddress: string = '';
  businessId: string = null;
  @Input('deliveryAddress') deliveryAddress: any;
  @Input('calledFromAccept') calledFromAccept: boolean = false;
  @Input('isbusinessOffer') isbusinessOffer: boolean = false;
  @Input('calculateShipping') calculateShipping: any;
  @Input('shippingVendor') shippingVendor: any;
  @Input('selectedAssureDelivery') selectedAssureDelivery: any = false;
  @Input('selectedAssureAmount') selectedAssureAmount: any;
  @Input('totalAmount') totalAmount: any;
  @Input('exchangeMode') exchangeMode: string;
  @Output("updateDeliverAddress") updateDeliverAddress: EventEmitter<any> = new EventEmitter();
  @Output("updateAssureDelivery") updateAssureDelivery: EventEmitter<any> = new EventEmitter();
  constructor(
    private authService: AuthService,
    public matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getUserAddress();
  }

  getUserAddress() {
    const isOwnerLoggedIn = this.authService.isSwitchedToBusinessProfile();
    if (isOwnerLoggedIn) {
      const businesslist = this.authService.getAuthInfo()?.business;
      const selectedBusinessId = this.authService.getSelectedBusinessId();
      if (selectedBusinessId && selectedBusinessId?.businessId) {
        const businessData = businesslist.find(val => val.businessId == selectedBusinessId?.businessId)
        if (businessData) {
          this.businessId = businessData.businessId;
        }
      }
    }
      
    this.addressSubscriber = this.authService.getUserAddress(this.businessId).subscribe(res => {
      if (res['payload']) {
        if(this.businessId == '' || this.businessId == null){
         if(Array.isArray(res['payload'])){
          this.addressList = res['payload'] ? res['payload'] : [];
          if(!this.selectedAddress){
            if(this.addressList && this.addressList?.length){
              const defaultAddress =  this.addressList.find((val)=>val.default);
              if(defaultAddress){
                this.updateDeliveryOption('', defaultAddress);
              }
            }
          }
         }
        } else {
          if(res['payload']['businessAddresses'] && Array.isArray(res['payload']['businessAddresses'])){
            this.addressList = res['payload']['businessAddresses'] ? res['payload']['businessAddresses'] : [];
            if(!this.selectedAddress){
              if(this.addressList && this.addressList?.length){
                const defaultAddress =  this.addressList.find((val)=>val.default);
                if(defaultAddress){
                  this.updateDeliveryOption('', defaultAddress);
                }
              }
            }
           }
        }
      } else {
        this.addressList = [];
      }
    }, err => {
      this.addressList = [];
    })
  }

  addAddress(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = 'user-suggest-new-address-component';
    dialogConfig.position = {
      top: '10px',
    };
    dialogConfig.height = 'auto';
    dialogConfig.width = '800px';
    dialogConfig.data = {
      businessId: this.businessId,
    }
    const modalDialog = this.matDialog.open(NewAddressComponent, dialogConfig);
    modalDialog.afterClosed().subscribe(results => {
      if(results && results['id']){
        this.getUserAddress();
        this.updateDeliveryOption('', results);
      }
    });
  }

  updateDeliveryOption(event, address:any=''){
    if(address){
      this.selectedAddress = address?.id;
      this.updateDeliverAddress.emit(address);
    } else {
      const addressId = event.value;
      const defaultAddress =  this.addressList.find((val)=>val.id == addressId);
      if(defaultAddress){
        this.selectedAddress = addressId;
        this.updateDeliverAddress.emit(defaultAddress);
      }
    }
  }

  selectAssureDelivery(event){
    this.updateAssureDelivery.emit(event.checked);
  }
  removeAssureDelivery(){
    this.updateAssureDelivery.emit(false);
  }
  showAssureDelivery(){
    if(this.totalAmount >= '5000' && !this?.isbusinessOffer){
      return true;
    } else {
      return false;
    }
  }

  totalPay(){
    let amount = parseFloat(this.totalAmount); 
    if(this.shippingVendor?.rate){
      amount = amount + parseFloat(this.shippingVendor?.rate);
    }
    if(this.showAssureDelivery() && this.selectedAssureDelivery){
      amount = amount + parseFloat(this.selectedAssureAmount);
    }
    return amount;
  }

}
