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
    apiKey: "AIzaSyDF8q5f7ErhnFfy9261MdnJi2mAJw_pgjk",
    authDomain: "gintaa-cloud-alpha.firebaseapp.com",
    databaseURL: "https://gintaa-cloud-alpha.firebaseio.com",
    projectId: "gintaa-cloud-alpha",
    storageBucket: "gintaa-cloud-alpha.appspot.com",
    messagingSenderId: "574114177967",
    appId: "1:574114177967:web:e671f92319b1b055d7455a",
    measurementId: "G-6D3XWVX73P",
    appCheckReCapchaV3Key: '6LcPnM0bAAAAANao_klTUMiZyU8hjqLnFVFBionv'
  },
  dynamicLinkConfig: {
    iosBundleId: "com.asconsoft.gintaa.alpha",
    androidPackageName: "com.asconsoft.gintaa.alpha",
    dynamicLinkDomain: "alpha.link.gintaa.com",
    minimumVersion: "12"
  },
  serverUrl: 'https://alpha.api.gintaa.com/',
  websiteUrl: 'https://alpha.gintaa.com',
  chatSocketUrl: 'https://alpha.api.gintaa.com/deals',
  // configs related to logger service
  allowConsole: true,
  addConsoleDebugs: true,
  browserLogLevel: '',
  addClientIP: false,
  addClientDeviceInfo: false,
  currentPhase: 'default', // Ex: default, phase_1, phase_2, phase_3, phase_4 ....
  offerLaunchDate: null, //'Sat Oct 02 2021',
  razorpay_option_key: 'rzp_test_TFKbE6YckeSGxF',
  remotConfig_minimumFetchIntervalMillis: 3600000
};

//console.log('Inside alpha environment ts');

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
