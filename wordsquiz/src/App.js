import { FirebaseProvider } from "./components/contexts/FirebaseContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/routes/Login";
import Quiz from "./components/routes/Quiz";
import Dictionary from "./components/routes/Dictionary";
import AuthWrapper from "./components/common/AuthWrapper";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#795548",
    },
    secondary: {
      main: "#ff5722",
    },
    error: {
      main: "#d32f2f",
    },
    success: {
      main: "#2e7d32",
    },
  },
});

export default function App() {
  return (
    <FirebaseProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container>
            <Routes>
              <Route path="/login" element={<Login />}></Route>
              <Route
                path="/"
                index
                element={
                  <AuthWrapper>
                    <Quiz />
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
        </ThemeProvider>
      </BrowserRouter>
    </FirebaseProvider>
  );
}
