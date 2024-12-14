import { Injectable, Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({
  name: 'formatChatTime'
})

@Injectable({
  providedIn: 'root'
})
export class FormatChatTimePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if(value){
      // const locatDateTime = moment.utc(value).toDate();
      // const localTime = moment(locatDateTime).format('hh:mm a'); 
      // return localTime;
      let dateStr = '';
      let todayStart = new Date();
      todayStart.setHours(0);
      todayStart.setMinutes(0);
      todayStart.setSeconds(0);
      let todayEnd = new Date();
      todayEnd.setHours(23);
      todayEnd.setMinutes(59);
      todayEnd.setSeconds(59);
      let locatDateTime =  moment.utc(value).toDate(); // month - 1 because January == 0
      const diff = todayStart.getTime() - locatDateTime.getTime();
      if (locatDateTime.getTime() > todayStart.getTime() && locatDateTime.getTime() < todayEnd.getTime()) {
        dateStr ="Today";
      } else if (diff <= (24 * 60 * 60 *1000)) {
        dateStr = "Yesterday";
      } else { 
        dateStr =  moment(locatDateTime).format('DD/MM/YYYY');  // or format it what ever way you want
      }

      const localTime = moment(locatDateTime).format('hh:mm a'); 
      if(dateStr === "Today"){
          return localTime;
      }
      return dateStr;
    }
    
  }

}
