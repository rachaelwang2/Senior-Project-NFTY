// import * as firebase from 'firebase';
// import '@firebase/auth';
// import '@firebase/firestore';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'
import "firebase/analytics";
// import myauth from '@react-native-firebase/auth';
// import myfirestore from '@react-native-firebase/firestore';
// import mystorage  from '@react-native-firebase/storage';
// import '@react-native-firebase/analytics';
import "firebase/functions";
// firebase.analytics();

var firebaseConfig = {
    apiKey: "AIzaSyBduAK_uamBF0RNbJROnqI-MRp29vSeu30",
    authDomain: "nfty-dc26a.firebaseapp.com",
    projectId: "nfty-dc26a",
    storageBucket: "nfty-dc26a.appspot.com",
    messagingSenderId: "591307275225",
    appId: "1:591307275225:web:70ca4b5cb25ccf7b3c77c8",
    measurementId: "G-H8CZZM0QZ2"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const fireauth = firebase.auth;
export const firestore = firebase.firestore();
export const storage = firebase.storage();
export const firebasestore = firebase.firestore;
export const firebasestorage = firebase.storage;
