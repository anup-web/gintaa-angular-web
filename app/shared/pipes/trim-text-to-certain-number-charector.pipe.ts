import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimTextToCertainNumberCharector'
})
export class TrimTextToCertainNumberCharectorPipe implements PipeTransform {

  transform(text: string, limit: number = 10): any {
    limit = (limit) ? limit : 10;
    if(text && text.length > limit) {
      return text.substring(0, limit) + '...'
    }
    return text;
  }

}
