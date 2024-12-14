// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVerificationDisabledForTesting: false,
  gtagTrakingId: 'UA-166031490-1',
  googleApiKey: 'AIzaSyCN8NceFYZg-ggg4jKbT2QIIg7jQtOg20Y',
  enableDebug: true,
  firebaseConfig:{
    apiKey: "AIzaSyCI4zVAfZVZqrKKFnlH8NEhby6S1NrUuHg",
    authDomain: "gintaa-cloud-develop.firebaseapp.com",
    databaseURL: 'https://gintaa-firebase.firebaseio.com',
    projectId: "gintaa-cloud-develop",
    storageBucket: "gintaa-cloud-develop.appspot.com",
    messagingSenderId: "478502639208",
    appId: "1:478502639208:web:46883e31855148f4d5cddd",
    measurementId: "G-G5PB4Y2X2E",
    appCheckReCapchaV3Key: '6LcB8rEbAAAAAOuftjS4KVH5tnSTN8yhkhig_Gna'
  },
  dynamicLinkConfig: {
    iosBundleId: "com.asconsoft.gintaa.dev",
    androidPackageName: "com.asconsoft.gintaa.dev",
    dynamicLinkDomain: "devlinks.gintaa.com",
    minimumVersion: "12"
  },
  serverUrl: 'https://dev.api.gintaa.com/',
  websiteUrl: 'https://dev.gintaa.com',
  chatSocketUrl: 'https://dev.api.gintaa.com/deals',
  // configs related to logger service
  allowConsole: true,
  addConsoleDebugs: true,
  browserLogLevel: '',
  addClientIP: false,
  addClientDeviceInfo: false,
  currentPhase: 'phase_2', // Ex: default, phase_1, phase_2, phase_3, phase_4 ....
  offerLaunchDate: 'Sat Oct 02 2021',
  razorpay_option_key: 'rzp_test_TFKbE6YckeSGxF',
  remotConfig_minimumFetchIntervalMillis: 3600000
};

//console.log('Inside milestone dev environment ts');

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
