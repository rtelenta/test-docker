import * as firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/messaging';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET
};

let msg = null;
let dataRef = null;

try {
    if (!firebase.apps.length) {
        firebase.initializeApp(config);
        msg = firebase.messaging();
    }
} catch (e) {
    window.console.log('Unable to Instantiate Firebase Messaing', e);
}

const userID = window.localStorage.getItem('idUser');
dataRef = firebase.database().ref("/pepe/"+userID);

export const database = dataRef;
export const messaging = msg;