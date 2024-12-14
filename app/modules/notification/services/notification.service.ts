import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationReadEvent$: any = new Subject();

  constructor() { }

  onReadNotification(event){
    this.notificationReadEvent$.next(event);
  }
}
