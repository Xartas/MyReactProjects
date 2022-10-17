import { FirebaseProvider } from "./components/contexts/FirebaseContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/pages/Login";
import Quiz from "./components/pages/Quiz";
import Dictionary from "./components/pages/Dictionary";
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
                path="/quiz"
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
