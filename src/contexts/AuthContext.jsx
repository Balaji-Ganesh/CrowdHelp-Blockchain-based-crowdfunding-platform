import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase-config";
import firebase from "firebase/compat/app";

// service imports..
import { useNavigate } from "react-router-dom";

// to maintain the status of the authentication across the application
const AuthContext = React.createContext();

// hook access the context outside this..
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // hooks..
  const [currentUserCredentials, setCurrentUserCredentials] = useState();
  const [isLoading, setIsLoading] = useState(true); // to store the status .. whether processing or stopped.

  const [authState, setAuthState] = React.useState(
    false || window.localStorage.getItem("authStatus") === "true"
  );
  const [token, setToken] = React.useState("");

  const navigate = useNavigate();

  // hooks..handle whenever refreshed..
  useEffect(() => {
    // set the credentials, whenver sign-up/sign-in happens.
    const unsubscriber = auth.onAuthStateChanged((userCredentials) => {
      setIsLoading(false); // as soon as done. stop
      if (userCredentials) {
        setCurrentUserCredentials(userCredentials);
        // if yes, keep logged in.
        setAuthState(true);
        window.localStorage.setItem("authStatus", "true"); // save in local storage.. can cut-off the delay
        // get token..
        userCredentials.getIdToken().then((token) => {
          setToken(token);
          navigate("/");  // navigate to home page
          // console.log(token);
        });
      }
    });
    return unsubscriber; // for unsubscribe from onAuthStateChanged listener [later when needed]
  }, []);

  // helpers
  function signUpWithEmailAndPassword(email, password) {
    // console.log(`Signup called with ${email} & ${password}`);
    return auth.createUserWithEmailAndPassword(email, password); // this returns the promise, later based on its value Signup_Success or Failure will be taken care.
  }

  const signInWithGooglePopup = () => {
    return auth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    // .then((userCredentials) => {
    //   console.log(userCredentials);
    // });
  };

  const signInWithEmailAndPassword = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signout = (email, password) => {
    return auth.signOut();
  };

  const resetPassword = (email) => {
    const promise = auth.sendPasswordResetEmail(email);
    console.log("Password reset email sent");
    return promise;
  };

  const updateEmail = (email) => {
    return currentUserCredentials.updateEmail(email);
  };

  const updatePassword = (password) => {
    return currentUserCredentials.updatePassword(password);
  };

  // context value thats going to be used in other pages..
  const value = {
    currentUserCredentials,
    signUpWithEmailAndPassword,
    signInWithGooglePopup,
    signInWithEmailAndPassword,
    signout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
      {/* ☝🏽 Don't  render until current user loads..*/}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
