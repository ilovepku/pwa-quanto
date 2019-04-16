import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pwa-quanto.firebaseapp.com",
  databaseURL: "https://pwa-quanto.firebaseio.com",
  projectId: "pwa-quanto",
  storageBucket: "pwa-quanto.appspot.com",
  messagingSenderId: "945585260156"
};
firebase.initializeApp(config);

const uiConfig = {
  signInSuccessUrl: "/settings",
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID
  ]
};

export { firebase, uiConfig };
