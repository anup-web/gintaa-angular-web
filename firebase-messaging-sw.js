importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js');
firebase.initializeApp({
  apiKey: "AIzaSyCI4zVAfZVZqrKKFnlH8NEhby6S1NrUuHg",
  authDomain: "gintaa-cloud-develop.firebaseapp.com",
  databaseURL: 'https://gintaa-firebase.firebaseio.com',
  projectId: "gintaa-cloud-develop",
  storageBucket: "gintaa-cloud-develop.appspot.com",
  messagingSenderId: "478502639208",
  appId: "1:478502639208:web:46883e31855148f4d5cddd",
  measurementId: "G-G5PB4Y2X2E",
  appCheckReCapchaV3Key: '6LcB8rEbAAAAAOuftjS4KVH5tnSTN8yhkhig_Gna'
});
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    // Customize notification here
    const notificationTitle = 'Background Message Title';
    const notificationOptions = {
      body: 'Background Message body.',
      icon: '/firebase-logo.png'
    };
  
    // self.registration.showNotification(notificationTitle,
    //   notificationOptions);
  });

  self.addEventListener('notificationclick', function (event) {

    // console.log('Click on notification..')
    // event.notification.close();
  
    // let navigateUrl = event.notification.data.click_action;
  
    // event.waitUntil(
    //   clients.openWindow(navigateUrl)
    // );
  });