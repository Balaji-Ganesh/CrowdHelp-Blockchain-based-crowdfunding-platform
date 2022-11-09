import React, { useContext, useState, useEffect } from "react";
import { auth } from "../config/firebase-config";

// to maintain the status of the authentication across the application
const AuthContext = React.createContext();

// hook access the context outside this..
export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUserCredentials, setCurrentUserCredentials] = useState();
  const [isLoading, setIsLoading] = useState(true); // to store the status .. whether processing or stopped.
  // hooks..
  useEffect(() => {
    // set the credentials, whenver sign-up/sign-in happens.
    const unsubscriber = auth.onAuthStateChanged((userCredentials) => {
      setIsLoading(false); // as soon as done. stop
      setCurrentUserCredentials(userCredentials);
    });
    return unsubscriber; // for unsubscribe from onAuthStateChanged listener [later when needed]
  }, []);

  // helpers
  function signup(email, password) {
    console.log(`Signup called with ${email} & ${password}`);
    return auth.createUserWithEmailAndPassword(email, password); // this returns the promise, later based on its value Signup_Success or Failure will be taken care.
  }

  // context value thats going to be used in other pages..
  const value = {
    currentUserCredentials,
    signup,
  };

  return (
    <AuthContext.Provider value={value}>
      {!isLoading && children}
      {/* ☝🏽 Don't  render until current user loads..*/}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
