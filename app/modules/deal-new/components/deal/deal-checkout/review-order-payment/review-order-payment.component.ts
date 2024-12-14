import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
@Component({
  selector: 'app-review-order-payment',
  templateUrl: './review-order-payment.component.html',
  styleUrls: ['./review-order-payment.component.scss']
})
export class ReviewOrderPaymentComponent implements OnInit {

  @Input('selectedOfferDetail') selectedOfferDetail: any;
  @Input('itemQuantity') itemQuantity: number = 1;
  @Input('minitemQuantity') minitemQuantity: number = 1;
  @Input('disableSuggestBtn') disableSuggestBtn: boolean = false;
  @Input('maxitemQuantity') maxitemQuantity: number = 0;
  @Input('shippingVendor') shippingVendor: any;
  @Output("updateQuantity") updateQuantity: EventEmitter<any> = new EventEmitter();
  @Output("buyout") buyout: EventEmitter<any> = new EventEmitter();
  @Output("navigateToOffer") navigateToOffer: EventEmitter<any> = new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }

  clickAction(actionType){
    if(actionType ==='add' && this.selectedOfferDetail?.quantity < this.itemQuantity){
      this.updateQuantity.emit(actionType);
    } else {
      this.updateQuantity.emit(actionType);
    }
  }

  getTotalPayableAmount() :number {
    if(this.selectedOfferDetail?.price) {
      let amount = this.selectedOfferDetail?.price * this.itemQuantity;
      if(this.shippingVendor?.rate) {
        amount = amount + this.shippingVendor?.rate * this.itemQuantity;
      }
      return amount;
    } else {
      return null;
    }
  }
  
  goToOffer(offerId){
    this.navigateToOffer.emit(offerId);
  }

  payNow(){
    this.buyout.emit();
  }
  calculateShip(rate){
    if(rate && !isNaN(rate)){
      return this.itemQuantity * rate;
    } else {
      return rate;
    }
  }
}
