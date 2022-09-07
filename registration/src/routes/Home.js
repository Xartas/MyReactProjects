import React from "react";
import { useFirebase } from "../contexts/FirebaseContext";
import { signOut } from "firebase/auth";
import { Navigate } from "react-router-dom";

function Home() {
  const firebase = useFirebase();

  if (!firebase.user) {
    return <Navigate to="/signin" />;
  }

  const SignOut = () => {
    signOut(firebase.auth);
  };

  return (
    <>
      <span>{firebase.user.email}</span>
      <button onClick={SignOut}>Wyloguj</button>
    </>
  );
}

export default Home;
