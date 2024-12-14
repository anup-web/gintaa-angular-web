import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/analytics';
import { isPlatformBrowser } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class FirebaseAnalyticsService {
  analytics: any;
  constructor(    
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {    

    if (isPlatformBrowser(this.platformId)) {      
      this.analytics = firebase.default.analytics();
    }
  }

  logEvents(eventName: String): void {
    // shared method to log the events
    if (isPlatformBrowser(this.platformId)) {
      // console.log('LOG ANALYTICS EVENT: ', eventName);
      this.analytics.logEvent(eventName);
    }
  }
}
