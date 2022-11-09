import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: process.env.REACT_FIREBASE_APIKEY,
  authDomain: process.env.REACT_FIREBASE_AUTHDOMAIN,
  projectId: process.env.REACT_FIREBASE_PROJECTID,
  storageBucket: process.env.REACT_FIREBASE_STORAGEBUCKET,
  messagingSenderId: process.env.REACT_FIREBASE_MESSAGING_SENDERID,
  appId: process.env.REACT_FIREBASE_APPID,
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
