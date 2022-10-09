import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FirebaseProvider } from "./contexts/FirebaseContext";
import Navbar from "./components/common/navbar/Navbar";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/CreditsView";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import AuthWrapper from "./components/AuthWrapper";
import Subnavbar from "./components/admin/subnavbar/subnavbar";
import AdminYears from "./components/admin/years/YearsList";
import AdminPeriods from "./components/admin/periods/PeriodsList";
import AdminTemplates from "./components/admin/templates/TemplatesList";

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
                  <Route path="/billingYears" element={<AdminYears />} />
                  <Route path="/billingPeriods" element={<AdminPeriods />} />
                  <Route path="/billsTemplates" element={<AdminTemplates />} />
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
