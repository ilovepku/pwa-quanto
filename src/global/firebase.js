import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

var config = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "pwa-quanto.firebaseapp.com",
  databaseURL: "https://pwa-quanto.firebaseio.com",
  projectId: "pwa-quanto",
  storageBucket: "pwa-quanto.appspot.com",
  messagingSenderId: "945585260156",
  appId: "1:945585260156:web:53d63864488e8a14"
};

firebase.initializeApp(config);

export default firebase;
