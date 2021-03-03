import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7h2OFRzQRr8pebCuh0kioMqmUljxLei8",
    authDomain: "randomtext-eef62.firebaseapp.com",
    projectId: "randomtext-eef62",
    storageBucket: "randomtext-eef62.appspot.com",
    messagingSenderId: "356683639843",
    appId: "1:356683639843:web:2fa2f3dd88a7a1bbcd9596",
    measurementId: "G-HPJXM0JFF6"
};

firebase.initializeApp(firebaseConfig);

export const firebaseInstance = firebase;

export const authService = firebase.auth();