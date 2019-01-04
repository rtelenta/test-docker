importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase.js');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyDRARmopLdCJIh-K1c6pE47tAdt0xpn_LQ",
    authDomain: "pepe-pwa-prod.firebaseapp.com",
    databaseURL: "https://pepe-pwa-prod.firebaseio.com",
    messagingSenderId: "46719201890",
    projectId: "pepe-pwa-prod",
    storageBucket: "pepe-pwa-prod.appspot.com"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();