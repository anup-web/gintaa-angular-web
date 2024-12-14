import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Offer } from '@gintaa/modules/offer/model/offer';
import { defaultOwlOptions2 } from '@gintaa/shared/configs/ngx-owl-options-config';

@Component({
  selector: 'app-deal-offer-slider',
  templateUrl: './deal-offer-slider.component.html',
  styleUrls: ['./deal-offer-slider.component.scss']
})
export class DealOfferSliderComponent implements OnInit {
  
  @Input() myAllOffer: Offer[];
  @Input() senderSelectedOffers: any[];
  @Input() offerId: string;
  @Input() actionType: string = 'sender';
  @Input() selectedDeliveryOption: string = '';
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();

  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions2;
  constructor() { }

  ngOnInit() {
  }

  getPassedData(event) {
    try{
      if(event.startPosition === 0){
        let element = document.getElementById("arrow_left_nav");
        element.classList.add("disabled");
        let element2 = document.getElementById("arrow_right_nav");
        element2.classList.remove("disabled");
      } else {
        let element = document.getElementById("arrow_left_nav");
        element.classList.remove("disabled");
        const selectedOffer = this.senderSelectedOffers.filter((offer)=> offer?.selectedOffer)
        if(selectedOffer == (event.startPosition + 1)){
          let element2 = document.getElementById("arrow_right_nav");
          element2.classList.add("disabled");
        } else{
          let element2 = document.getElementById("arrow_right_nav");
          element2.classList.remove("disabled");
        }
      }
    } catch(e){

    }
  }

  onChangeEmit(data:any){
    this.onChange.emit(data);
  }

  getCurrectOffer(offerId, receiverSelectedOffers){
    return receiverSelectedOffers.find(val => val.offerId == offerId);
  }
  getOfferFromAll(offerId){
    return this.myAllOffer.find(val => val.offerId == offerId);
  }
  isSelectedOffer(offerId, receiverSelectedOffers){
    const currentOffer = receiverSelectedOffers.find(val => val.offerId == offerId);
    return currentOffer?.selectedOffer ? currentOffer?.selectedOffer : false
  }
  getSelectedOffer(){
    return this.senderSelectedOffers.filter((val:any) => val.selectedOffer)?.length
  }

}
