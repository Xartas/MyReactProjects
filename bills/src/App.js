import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Navbar from "./components/navbar/Navbar";
import Admin from "./pages/Admin/Admin";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/Credits";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import AuthWrapper from "./components/AuthWrapper";
import { useState } from "react";

function App() {
  const [billingPeriods, setBillingPeriods] = useState([]);

  return (
    <FirebaseProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route
            path="/"
            index
            element={
              <AuthWrapper>
                <Bills />
              </AuthWrapper>
            }
          />
          <Route
            path="/credits"
            element={
              <AuthWrapper>
                <Credits />
              </AuthWrapper>
            }
          />
          <Route
            path="/admin"
            element={
              <AuthWrapper>
                <Admin
                  billingPeriods={billingPeriods}
                  setBillingPeriods={setBillingPeriods}
                />
              </AuthWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </FirebaseProvider>
  );
}

export default App;
