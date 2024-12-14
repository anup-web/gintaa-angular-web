import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@gintaa/env';
import firebase from 'firebase';
import 'firebase/app-check';

@Injectable({
  providedIn: 'root'
})
export class AppFireService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) { 
    if (isPlatformBrowser(platformId)) {
      const appChk = firebase.appCheck();
      appChk.activate(environment.firebaseConfig.appCheckReCapchaV3Key, true)
    }
  }
}
