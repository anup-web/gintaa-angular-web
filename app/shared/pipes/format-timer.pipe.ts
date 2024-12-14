import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatTimer'
})
export class FormatTimerPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const hours: number = Math.floor(value / 3600);
    const minutes: number = Math.floor((value % 3600) / 60);
    if (hours > 0) {
        return ('00' + hours).slice(-2) + ':' + ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    } else if (minutes > 0) {
        return ('00' + minutes).slice(-2) + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    } else {
        return '00' + ':' + ('00' + Math.floor(value - minutes * 60)).slice(-2);
    }
  }

}
