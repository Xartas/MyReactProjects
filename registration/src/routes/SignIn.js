import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";
import { useNavigate } from "react-router-dom";

function SignIn() {
  const [email, setEmail] = useState("seba.wrona@gmail.com");
  const [password, setPassword] = useState("123123123");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();
  const firebase = useFirebase();

  const login = () => {
    signInWithEmailAndPassword(firebase.auth, email, password)
      .then((userCredential) => navigate("/"))
      .catch((e) => setErrorMsg(e.code));
  };

  return (
    <>
      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={login}>Zaloguj</button>
      <span>{errorMsg}</span>
    </>
  );
}

export default SignIn;
