import React, { useState } from "react";
import { FormGroup } from "@mui/material";
import "./Login.scss";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login({ auth }) {
  const [email, setEmail] = useState("seba.wrona@gmail.com");
  const [password, setPassword] = useState("123qwe");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const logInToApp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => navigate("/"))
      .catch((e) => setErrorMsg(e.code));
  };

  return (
    <React.Fragment>
      <div className="loginWrapper">
        <FormGroup className="loginForm">
          <div className="inputContainer">
            <input
              className="input"
              placeholder="Adres e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="inputContainer">
            <input
              className="input"
              placeholder="Hasło"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="loginBtn" onClick={logInToApp}>
            Zaloguj
          </button>
          <span className="errorMsg">{errorMsg}</span>
        </FormGroup>
      </div>
    </React.Fragment>
  );
}
export default Login;
