import { FirebaseProvider } from "./components/contexts/FirebaseContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar/Navbar";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import Dictionary from "./components/pages/Dictionary";
import AuthWrapper from "./components/common/AuthWrapper";
import Container from "@mui/material/Container";

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Container>
          <Navbar />
        </Container>
        <Container>
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route
              path="/"
              index
              element={
                <AuthWrapper>
                  <Home />
                </AuthWrapper>
              }
            ></Route>
            <Route
              path="/dictionary"
              index
              element={
                <AuthWrapper>
                  <Dictionary />
                </AuthWrapper>
              }
            ></Route>
          </Routes>
        </Container>
      </BrowserRouter>
    </FirebaseProvider>
  );
}
