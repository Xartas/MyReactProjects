import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./routes/Home";
import SignIn from "./routes/SignIn";
import SignUp from "./routes/SignUp";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Dancers from "./routes/Dancers";
import Presentations from "./routes/Presentations";
import Navigation from "./components/Navigation";
import AuthWrapper from "./components/AuthWrapper";

function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route
            path="/"
            index
            element={
              <AuthWrapper>
                <Home />
              </AuthWrapper>
            }
          />
          <Route path="/signup" index element={<SignUp />} />
          <Route path="/signin" index element={<SignIn />} />
          <Route
            path="/dancers"
            index
            element={
              <AuthWrapper>
                <Dancers />
              </AuthWrapper>
            }
          />
          <Route
            path="/pres"
            index
            element={
              <AuthWrapper>
                <Presentations />
              </AuthWrapper>
            }
          />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
