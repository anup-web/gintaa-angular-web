// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVerificationDisabledForTesting: false,
  gtagTrakingId: 'UA-166031490-1',
  googleApiKey: 'AIzaSyCN8NceFYZg-ggg4jKbT2QIIg7jQtOg20Y',
  enableDebug: true,
  firebaseConfig: {
    apiKey: 'AIzaSyDQv7d-VwzbCzWTy17EY9a3jjqb3ovDNCA',
    authDomain: 'gintaa-cloud-prod.firebaseapp.com',
    databaseURL: 'https://gintaa-cloud-prod-default-rtdb.asia-southeast1.firebasedatabase.app"',
    projectId: 'gintaa-cloud-prod',
    storageBucket: 'gintaa-cloud-prod.appspot.com',
    messagingSenderId: '417223880744',
    appId: '1:417223880744:web:dda7f45feb9ec5646b851d',
    measurementId: 'G-1S4E0ZVVQX',
    appCheckReCapchaV3Key: '6Ldz2QgcAAAAAKgmCckIHDA9uluSwmGK81cybxQ1'
  },
  dynamicLinkConfig: {
    iosBundleId: "com.asconsoft.gintaa.prod",
    androidPackageName: "com.asconsoft.gintaa.prod",
    dynamicLinkDomain: "dl.gintaa.com",
    minimumVersion: "12"
  },
  serverUrl: 'https://api.gintaa.com/',
  websiteUrl: 'https://gintaa.com',
  // configs related to logger service
  allowConsole: true,
  addConsoleDebugs: true,
  browserLogLevel: '',
  addClientIP: false,
  addClientDeviceInfo: false,
  currentPhase: 'default', // Ex: default, phase_1, phase_2, phase_3, phase_4 ....
  offerLaunchDate: 'Sat Oct 02 2021',
  razorpay_option_key: 'rzp_live_QVX0K25TXcAq8G',
  remotConfig_minimumFetchIntervalMillis: 3600000
};

//console.log('Inside prod environment ts');
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
