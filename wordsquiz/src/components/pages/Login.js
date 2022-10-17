import React, { useState } from "react";
import {
  Button,
  Container,
  Grid,
  TextField,
  Stack,
  Typography,
} from "@mui/material";
import { useFirebase } from "../contexts/FirebaseContext";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEamil] = useState("seba.wrona@gmail.com");
  const [password, setPassword] = useState("123qwe123qwe");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const logIn = () => {
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then(() => navigate("/"))
      .catch((e) => setErrorMsg(e.code));
  };

  return (
    <Container maxWidth="xs">
      <Grid
        container
        spacing={2}
        minHeight="100vh"
        justifyContent="center"
        alignItems="center"
      >
        <Grid item>
          <Typography variant="h3" marginBottom={2}>
            WORDS QUIZ
          </Typography>
          <Stack spacing={2} direction="column">
            <TextField
              placeholder="Email"
              value={email}
              onChange={(e) => setEamil(e.target.value)}
              variant="outlined"
            />
            <TextField
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
            />
            <Button variant="contained" color="primary" onClick={logIn}>
              Zaloguj
            </Button>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}
