import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import "./Login.css";

function Login({ auth }) {
  const [mail, setMail] = useState("seba.wrona@gmail.com");
  const [password, setPassword] = useState("123qwe");
  const [error, setError] = useState("");

  const handleOnClick = () => {
    signInWithEmailAndPassword(auth, mail, password).catch((e) =>
      setError(e.code)
    );
  };

  return (
    <>
      <div className="loginForm">
        <input
          type="text"
          placeholder="Login"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
        />
        <input
          type="text"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleOnClick}>Zaloguj</button>
        <span style={{ color: "red" }}>{error}</span>
      </div>
    </>
  );
}

export default Login;
