import React from "react";
import { FormGroup, TextField } from "@mui/material";
import "./Login.scss";
import Navbar from '../../components/navbar/Navbar';

function Login() {
  return (
    <React.Fragment>
      <Navbar />
      <FormGroup className="loginForm">
        <div className="inputContainer">
        <input className="input" placeholder="Adres e-mail" /></div>
        <div className="inputContainer"><input className="input" placeholder="Hasło" /></div>
        <button className="loginBtn">Zaloguj</button>
      </FormGroup>
    </React.Fragment>
  );
}
export default Login;
