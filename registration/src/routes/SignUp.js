import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const register = () => {
    createUserWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => navigate("/"))
      .catch((e) => setErrorMsg(e.code));
  };

  return (
    <>
      <input
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={register}>Zarejestruj</button>
      <span>{errorMsg}</span>
    </>
  );
}

export default SignUp;
