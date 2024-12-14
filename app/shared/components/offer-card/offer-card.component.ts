import { isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { Offer } from '@gintaa/shared/models/offer';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent implements OnInit {

  @Input() offer: Offer;
  @Input() offerId: string;
  @Input() actionType: string;
  @Input() showCheckbox: boolean = true;
  @Input() disabled: boolean = false;
  @Input() cardName: string = '';
  @Input() showUpdateQty: boolean = false;
  @Input() showDesire: boolean =true;
  @Input() selectedOffer: any;
  @Input() selectedDeliveryOption: string = '';
  //matchbox
  offerNoImage: string = 'assets/images/no-image.png';
  @Output("onChange") onChange: EventEmitter<any> = new EventEmitter();

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  getOfferImage(img:any){
    if(img && img.hasOwnProperty('url') ){
      return img['url'];
    }
    return this.offerNoImage;
  }
  errorImageHandler(event){
    event.target.src = this.offerNoImage;
  }
  ngOnInit(): void {
// console.log("this.offer",this.offer)
  }

  navigateToOffer(offerId){
    const url = this.router.serializeUrl(
      this.router.createUrlTree([`/offer/${offerId}`])
    );
    
    if (isPlatformBrowser(this.platformId)) {
      window.open(url, '_blank');
    }
  }
  navigateToOfferOid(offer:any){
    if(offer?.oid){
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/offer/${offer.oid}`])
      );
      
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_blank');
      }
    } else {
      const url = this.router.serializeUrl(
        this.router.createUrlTree([`/offer/${offer.offerId}`])
      );
      
      if (isPlatformBrowser(this.platformId)) {
        window.open(url, '_blank');
      }
    }
  }
  selectOffer(event:any, offer:Offer){
    let offerTemp = {...this.selectedOffer};
    if(event.checked){
      offerTemp.selectedOffer = true;
      offerTemp.selectedQuantity = 1;
    } else{
      offerTemp.selectedOffer = false;
      offerTemp.selectedQuantity = 0;
    }
    this.onChange.emit({offer:offerTemp, offerId:offer.offerId, actionType:this.actionType});
  }

  clickUpdate(event:any, offer:Offer, action:string){
    let offerTemp = {...this.selectedOffer};
    let update = false;
    if(action === 'add' && (offerTemp.selectedQuantity < offer.quantity) ){
      offerTemp.selectedQuantity = offerTemp.selectedQuantity + 1;
      update = true;
    } else if(action === 'minus' && offerTemp.selectedQuantity > 1){
      offerTemp.selectedQuantity = offerTemp.selectedQuantity - 1;
      update = true;
    }
    if(update){
      this.onChange.emit({offer:offerTemp, offerId:offer.offerId, actionType:this.actionType});
    }
  }

  disableBtn(btn='left'){
    if(btn == 'left'){
      if(this.offer?.moq){
        return this.selectedOffer.selectedQuantity >= this.offer?.moq;
      } else {
        return this.selectedOffer.selectedQuantity <= 1 ? true : false;
      }
    } else {
      if(this.offer?.quantity){
        // if(this.offer?.exchangeMode == 'Money' && this.selectedDeliveryOption == 'Shipping'){
        //     return this.selectedOffer.selectedQuantity >= 5;
        // } else {
          return this.selectedOffer.selectedQuantity >= this.offer?.quantity;
        //}
      } else {
        return this.selectedOffer.selectedQuantity >= 10 ? true : true;
      }
    }
  }

}
