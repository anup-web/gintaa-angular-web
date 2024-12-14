import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { FormatMeetTimePipe } from './format-meet-time.pipe';

@Pipe({
  name: 'formatServiceTime'
})

@Injectable({
  providedIn: 'root'
})
export class FormatServiceTimePipe implements PipeTransform {

  transform(value: any[], ...args: any[]): any {
    const serviceTimeSame = args[0];
    if(value && !serviceTimeSame) {
      // value.
      const serviceTimings = [...value];
      let days = serviceTimings.map(day => day.dayOfWeek.toUpperCase().slice(0,2));
      let time = serviceTimings[0].timingInfoList[0];
      let formatMeetTimePipe = new FormatMeetTimePipe();

      return `${days.join(',')} : From ${formatMeetTimePipe.transform(time.startTime)} To ${formatMeetTimePipe.transform(time.endTime)}`;
    }    
  }

}
