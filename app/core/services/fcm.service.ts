import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireFunctions } from '@angular/fire/functions';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject, Subject } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';
declare var messaging:any
@Injectable({
  providedIn: 'root'
})

export class FcmService {
  currentMessage = new BehaviorSubject(null);
  realTimeMessages = new Subject();


  constructor(private angularFireMessaging: AngularFireMessaging,
    private _http: HttpClient,
    private angularFireStore: AngularFirestore,
    private authService: AuthService,
    private angularFireFunction: AngularFireFunctions) {
    this.angularFireMessaging.messages.subscribe(
    (_messaging: any) => {
      _messaging.onMessage = _messaging.onMessage.bind(_messaging);
      _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
    }, (error)=>{
      // console.log(error);
    })
  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
    (token) => {
      // console.log('fcmToken requestToken ####', token);
      localStorage.setItem('fcmToken',token);
    },
    (err) => {
      console.error('Unable to get permission to notify.', err);
    });
  }

  onTokenChange(){
    //this.requestPermission();
    this.angularFireMessaging.tokenChanges
    .pipe(
        mergeMap((res)=>{
          // console.log('fcmToken tokenChanges ####',res);
          const fbFunc = this.angularFireFunction.httpsCallable('registerFcmToken');

          return fbFunc({
            token: res
          })
        })
    )
    .subscribe((token) => {
        // console.log('fcmToken tokenChanges update in firebase ####',token);
        // localStorage.setItem('fcmToken',token);
      },
      (err) => {
        // console.error('Unable to get permission to notify.', err);
    });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
    (payload: any) => {
      // console.log("new message received. ", payload);
      this.realTimeMessages.next(payload.data);
    }, (error)=>{
      // console.log(error);
    })
    
    navigator.serviceWorker.addEventListener('message', function(event) {
      // console.log('Received a message from service worker: ', event.data);
    });
  }

  getAllNotifications(limit: number, offset: number = 0){
    return this.angularFireStore
          .collection('users')
          .doc(this.authService.currentUserId)
          .collection('notifications')
          .valueChanges({idField: 'id'});
    // const url = '../../../../assets/mock/fcm-notification/notification.json'
    // return this._http.get(url).pipe(
    //   map((data: any)=>{
    //     const start = limit*offset;
    //     const end = start+limit;
    //     data.payload = data.payload.slice(start, end)
    //     return data;
    //   })
    // );
  }

  getAllNotificationUnreadCount(){
    const url = '../../../../assets/mock/fcm-notification/notification.json'
    return this._http.get(url);
  }

  getOfferDetails(offerId: string){
    const url = '../../../../assets/mock/fcm-notification/offer.json'
    return this._http.get(url);
  }

  getDealDetails(dealId: string){
    const url = '../../../../assets/mock/fcm-notification/deal.json'
    return this._http.get(url);
  }

  getOfferMatchDetails(dealId: string){
    const url = '../../../../assets/mock/fcm-notification/offer-match.json'
    return this._http.get(url);
  }
}
