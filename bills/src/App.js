import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Navbar from "./components/navbar/Navbar";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/Credits";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import AuthWrapper from "./components/AuthWrapper";
import { Subnavbar } from "./components/admin/subnavbar/subnavbar";
import { BillingYears } from "./pages/Admin/billingYears/billingYears";
import { BillingPeriods } from "./pages/Admin/billingPeriods/billingPeriods";
import { BillsTemplates } from "./pages/Admin/billsTemplates/billsTemplates";

function App() {
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
            path="/admin/*"
            element={
              <AuthWrapper>
                <Subnavbar />
                <Routes>
                  <Route path="/billingYears" element={<BillingYears />} />
                  <Route path="/billingPeriods" element={<BillingPeriods />} />
                  <Route path="/billsTemplates" element={<BillsTemplates />} />
                </Routes>
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
