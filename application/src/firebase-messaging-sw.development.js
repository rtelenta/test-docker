importScripts('https://www.gstatic.com/firebasejs/5.5.0/firebase.js');

 // Initialize Firebase
 var config = {
    apiKey: "AIzaSyC6atrdQVjm36e6-uWg002qlPbLA6YR3j8",
    authDomain: "pepe-pwa-qa.firebaseapp.com",
    databaseURL: "https://pepe-pwa-qa.firebaseio.com",
    messagingSenderId: "1000908274963",
    projectId: "pepe-pwa-qa",
    storageBucket: "pepe-pwa-qa.appspot.com"
};

firebase.initializeApp(config);

const messaging = firebase.messaging();