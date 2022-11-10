import React from "react";
import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// this going to work as a private router to actual router.
// Why? to prevent from accessing certail pages.
// i.e., without getting signed in, if trying to access profile page, what shall we show?
const AuthProtectedRoute = ({ children }) => {
  const { currentUserCredentials } = useAuth();
  return currentUserCredentials ? children : <Navigate to="/sign-in" replace />;
};

export default AuthProtectedRoute;
