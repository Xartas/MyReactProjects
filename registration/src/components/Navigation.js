import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { useFirebase } from "../contexts/FirebaseContext";

export default function Navigation() {
  const firebase = useFirebase();
  const SignOut = () => {
    signOut(firebase.auth);
  };
  return (
    <>
      {firebase.user && (
        <span>Jesteś zalogowany jako: {firebase.user.email}</span>
      )}
      {!firebase.user && (
        <ul>
          <li>
            <Link to="/signup">Rejestracja</Link>
          </li>
          <li>
            <Link to="/signin">Logowanie</Link>
          </li>
        </ul>
      )}
      {firebase.user && (
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/dancers">Tancerze</Link>
          </li>
          <li>
            <Link to="/pres">Prezentacje</Link>
          </li>
          <li>
            <button onClick={SignOut}>Wyloguj</button>
          </li>
        </ul>
      )}
    </>
  );
}
