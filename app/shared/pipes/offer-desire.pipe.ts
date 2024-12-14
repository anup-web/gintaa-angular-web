import { Pipe, PipeTransform } from '@angular/core';
import { Offer } from '../models/offer';
@Pipe({
  name: 'offerDesire'
})
export class OfferDesirePipe implements PipeTransform {

  transform(offer: Offer, ...args: any[]): string {
    if(offer.desire){
      return (offer.desire.description && offer.desire.description.length > 30 ? 
        `${offer.desire.description.slice(0, 30)}...` : offer.desire.description) ||
        (offer.desire.amount ?  `Rs.${offer.desire.amount.toString()}` : offer.desire?.desireType)
        // (offer.desire.amount ?  `Rs.${offer.desire.amount.toString()}` : offer.exchangeMode)
    } else {
      return offer?.exchangeMode;
    }
  }

}
