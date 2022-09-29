import React from "react";
import { useFirebase } from "../contexts/FirebaseContext";
import { Navigate } from "react-router-dom";

export default function AuthWrapper({ children }) {
  const firebase = useFirebase();
  if (!firebase.user) {
    return <Navigate to="/signin" />;
  }
  return <>{children}</>;
}
