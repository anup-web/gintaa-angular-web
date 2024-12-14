import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {

  @Input('data') data: any;
  @Input('dealValue') dealValue: any;
  @Input('offerQty') offerQty: number = 1;
  @Output("navigateToOffer") navigateToOffer: EventEmitter<any> = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
  }

  goToOffer(offerId){
    this.navigateToOffer.emit(offerId);
  }

  isCoverKey(data){
    let result = false;
    if(data?.images && Array.isArray(data?.images) && data?.images?.length && data?.images[0].hasOwnProperty('cover') ){
      result = true;
    }
    return result
  }
  getOfferImage(data){
    let result = 'assets/images/no-image.png';
    if(data?.images && Array.isArray(data?.images) && data?.images?.length ){
      result = data?.images[0]['url'];
    }
    return result
  }

}
