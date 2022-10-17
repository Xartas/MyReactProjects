import { AppBar, Toolbar, Typography, Box, Container } from "@mui/material";
import React from "react";
import { useFirebase } from "../../contexts/FirebaseContext";
import SignOutButton from "./../../common/SignOutButton";

export default function Header() {
  const firebase = useFirebase();

  return (
    <AppBar>
      <Container>
        <Toolbar>
          <Typography noWrap>Witaj {firebase.user.email}!</Typography>
          <Box flexGrow={1} />
          <SignOutButton />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
