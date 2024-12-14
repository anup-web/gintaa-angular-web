import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultOwlOptions2 } from '@gintaa/shared/configs/ngx-owl-options-config';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-incoming-offer-slider',
  templateUrl: './incoming-offer-slider.component.html',
  styleUrls: ['./incoming-offer-slider.component.scss']
})
export class IncomingOfferSliderComponent implements OnInit {
  @Input('data') data: any;
  @Input('requestedAmount') requestedAmount: any;
  @Output("navigateToOffer") navigateToOffer: EventEmitter<any> = new EventEmitter();
  @Input('requestedAmountPaidByInitiatingUser') requestedAmountPaidByInitiatingUser: boolean;
  @Input('colType') colType: number = 3;
  @Input('listType') listType: string;
  arrow_left_nav:string = 'arrow_left_nav'+ Math.random()
  arrow_right_nav:string = 'arrow_left_nav'+ Math.random()
  
  title = 'angularowlslider';
  customOptions: OwlOptions = defaultOwlOptions2;
  constructor() { }

  ngOnInit() {
  }
  getPassedData(event) {
   try{
    if(event.startPosition === 0){
      let element = document.getElementById(this.arrow_left_nav);
      element.classList.add("disabled");
      let element2 = document.getElementById(this.arrow_right_nav);
      element2.classList.remove("disabled");
    } else {
      let element = document.getElementById(this.arrow_left_nav);
      element.classList.remove("disabled");
      let number = 1;
      let amt = this.data.length;
      if(this.requestedAmountPaidByInitiatingUser && this.requestedAmount){
        amt = amt + 1;
      }
      if(amt == (event.startPosition + number)){
        let element2 = document.getElementById(this.arrow_right_nav);
        element2.classList.add("disabled");
      } else{
        let element2 = document.getElementById(this.arrow_right_nav);
        element2.classList.remove("disabled");
      }
    }
   } catch(e){
   }
  }
  showArrowButton(){
    if(this.requestedAmountPaidByInitiatingUser && this.requestedAmount && this.data && this.data.length){
      return true;
    } else if(this.data && this.data.length > 1){
      return true;
    } else {
      return false;
    }
  }
  onClickOffer(offerId: string){
    this.navigateToOffer.emit(offerId);
  }

  checkIsOffer(){
    if(this.data){
      return !this.data.length
    } else {
      return true;
    }
  }

  getItemWisePrice(price, qty=1){
    try{
      return price / qty;
    } catch(e){
      return '';
    }
  }

}
