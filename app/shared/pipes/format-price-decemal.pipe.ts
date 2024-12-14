import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatPriceDecemal'
})
export class FormatPriceDecemalPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let returnVal = (value && !isNaN(value)) ? value.toFixed(2) : value
    return returnVal;
  }

}
