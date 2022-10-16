import { AppBar, Toolbar, Typography } from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { useFirebase } from "../../contexts/FirebaseContext";
import SignOutButton from "./../../common/SignOutButton";

export default function Header() {
  const firebase = useFirebase();

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ justifyContent: "space-between" }}>
        <Typography noWrap>Witaj {firebase.user.email}!</Typography>
        <SignOutButton />
      </Toolbar>
    </AppBar>
  );
}
