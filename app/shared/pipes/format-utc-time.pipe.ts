import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatUTCTime'
})

@Injectable({
  providedIn: 'root'
})
export class FormatUTCTimePipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    // we supposed to get the date in this below format
    // 2020-08-30T11:55:16 <-- UTC Date without .000Z
    // ONLY FOR DEAL DATE
    if (!value.includes('000Z')) {
        value += '.000Z';
    }
    const date = new Date(value);
    if (date) {
        return date.toLocaleTimeString();
    } else {
        return value;
    }
  }
}
