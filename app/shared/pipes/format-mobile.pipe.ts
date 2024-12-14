import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatMobile'
})
export class FormatMobilePipe implements PipeTransform {

  transform(value: string, ...args: any[]): string {
    let phone: string         = value;
    let replaceString: string = '+91';
    return (phone && phone.includes(replaceString)) ? phone.replace(replaceString, replaceString+' ') : phone;
  }

}
