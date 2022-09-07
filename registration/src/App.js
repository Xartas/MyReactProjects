import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { FirebaseProvider } from "./contexts/FirebaseContext";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Home />} />
          <Route path="/signup" index element={<SignUp />} />
          <Route path="/signin" index element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
