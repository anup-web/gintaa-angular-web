import { Pipe, PipeTransform } from '@angular/core';
import { availableServiceDays } from '@gintaa/modules/offer/config/offer.config';

@Pipe({
  name: 'dayPrefix'
})

export class FormatDayPrefixPipe implements PipeTransform {
  
  transform(currentDay: string, ...args: any[]): any {
    if(currentDay) {
      return availableServiceDays.filter(day => day.dayOfWeek.toLowerCase() === currentDay.toLowerCase())[0].prefix;
    } 
    return null;
  }
}
