import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from '../models/offer';
@Pipe({
  name: 'offerLocation'
})

export class OfferLocationPipe implements PipeTransform {

  transform(offer: Offer, ...args: any[]): any {
    if(offer.location) {
      return offer.location.area ? offer.location.area.toLowerCase() !== offer.location.city.toLowerCase() ? 
       `${offer.location.area},${offer.location.city}` 
       : `${offer.location.area}` 
       : `${offer.location.city}`;
    } 
    return null;
  }
}
