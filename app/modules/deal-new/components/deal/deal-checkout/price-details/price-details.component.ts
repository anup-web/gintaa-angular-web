import { Component, OnInit, Input } from '@angular/core';
@Component({
  selector: 'app-price-details',
  templateUrl: './price-details.component.html',
  styleUrls: ['./price-details.component.scss']
})
export class PriceDetailsComponent implements OnInit {

  @Input('selectedOfferDetail') selectedOfferDetail: any;
  @Input('shippingVendor') shippingVendor: any;
  @Input('itemQuantity') itemQuantity: number = 1;

  constructor() { }

  ngOnInit(): void {
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

  calculateDiscount() : number{
    if(this.selectedOfferDetail?.price) {
      return (this.selectedOfferDetail.unitOfferValuation - this.selectedOfferDetail?.price);
    } else {
      return null;
    }
  }

  calculateShip(rate){
    if(rate && !isNaN(rate)){
      return this.itemQuantity * rate;
    } else {
      return rate;
    }
  }

}
