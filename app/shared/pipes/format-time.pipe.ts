import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTime'
})

@Injectable({
  providedIn: 'root'
})
export class FormatTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value) {
      const dateArr = value.split('T');
      const fullDateArr = dateArr[1].toLocaleTimeString();
      let hours = fullDateArr[0];
      let minutes = fullDateArr[1];
      const ampm = hours >= 12 ? 'pm' : 'am';
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      const strTime = hours + ':' + minutes + ' ' + ampm;
      return fullDateArr;
    }
    return value;
    
  }

}
