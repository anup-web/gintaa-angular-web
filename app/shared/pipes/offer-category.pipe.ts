import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offerCategory'
})
export class OfferCategoryPipe implements PipeTransform {

  transform(offer: any, ...args: any[]): any {
    if(offer.desire){
      const categoryLabel =  offer.category? (offer.desire.vertical? `, ${offer.category.label}`: offer.category.label): '';
      const verticalLabel = offer.desire.vertical? `${offer.desire.vertical.label}`: '';
      return `${verticalLabel}${categoryLabel}`;
    } else {

      
      if(offer.category) {
        const categoryLabel =  `, ${offer.category?.categoryName}`;
        const verticalLabel = `${offer.category?.vertical?.label}`;
        return `${verticalLabel}${categoryLabel}`;
      } else {
        return ''
      }
    }
  }

}
