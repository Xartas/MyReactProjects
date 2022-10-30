import { Button } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { useFirebase } from "../contexts/FirebaseContext";

export default function SignOutButton() {
  const firebase = useFirebase();
  const logOutUser = () => {
    signOut(firebase.auth);
  };
  return (
    <Button variant="contained" color="secondary" onClick={logOutUser}>
      Wyloguj
    </Button>
  );
}
