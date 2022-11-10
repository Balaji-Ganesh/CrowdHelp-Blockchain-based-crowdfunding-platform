import firebase from "firebase/compat/app";

const firebaseConfig = {
  apiKey: "AIzaSyCqkXQ1RXsNc4h1o-crilJ4kyk-kP2sELY",
  authDomain: "fir-experiments-16493.firebaseapp.com",
  projectId: "fir-experiments-16493",
  storageBucket: "fir-experiments-16493.appspot.com",
  messagingSenderId: "646710968437",
  appId: "1:646710968437:web:a04fd85f922b759ca0783c",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
// export 📦
export default app;
