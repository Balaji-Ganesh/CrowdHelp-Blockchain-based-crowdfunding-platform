import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// this going to work as a private router to actual router.
// Why? to prevent from accessing certail pages.
// i.e., without getting signed in, if trying to access profile page, what shall we show?
const AuthProtectedRoute = ({ redirectPath = "/sign-in", children }) => {
  const { currentUserCredentials } = useAuth();

  if (!currentUserCredentials) {
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default AuthProtectedRoute;
