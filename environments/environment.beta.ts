// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --beta` replaces `environment.ts` with `environment.beta.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVerificationDisabledForTesting: false,
  gtagTrakingId: 'UA-166031490-1',
  googleApiKey: 'AIzaSyCN8NceFYZg-ggg4jKbT2QIIg7jQtOg20Y',
  enableDebug: true,
  firebaseConfig: {
    apiKey: "AIzaSyAyiL8RlUHS_qF26DwJfg0BOoK8jlEslPA",
    authDomain: "gintaa-cloud-beta.firebaseapp.com",
    databaseURL: 'https://gintaa-cloud-beta-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: "gintaa-cloud-beta",
    storageBucket: "gintaa-cloud-beta.appspot.com",
    messagingSenderId: "502790464629",
    appId: "1:502790464629:web:d5da49c0e5914a94f0043c",
    measurementId: "G-LYGWTZNBCG",
    appCheckReCapchaV3Key: '6Lfu2AgcAAAAAFyP5AmQs9Rj-yP44YhDvIgfYKgD'
  },
  dynamicLinkConfig: {
    iosBundleId: "com.asconsoft.gintaa.beta",
    androidPackageName: "com.asconsoft.gintaa.beta",
    dynamicLinkDomain: "beta.dl.gintaa.com",
    minimumVersion: "12"
  },

  serverUrl: 'https://beta.api.gintaa.com/',
  websiteUrl: 'https://beta.gintaa.com',
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

//console.log('Inside beta environment ts');
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
