import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Admin from "./pages/Admin/Admin";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/Credits";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";
import { billingPeriodsList } from "./utils/utils";

function App({ auth, firestore }) {
  const [user, setUser] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [billingPeriods, setBillingPeriods] = useState([]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!isDbInitialized) {
        setIsDbInitialized(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setBillingPeriods(billingPeriodsList);
  }, []);

  if (!isDbInitialized) return <></>;

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          index
          element={
            <Bills auth={auth} user={user} billingPeriods={billingPeriods} />
          }
        />
        <Route path="/credits" element={<Credits auth={auth} user={user} />} />
        <Route
          path="/admin"
          element={
            <Admin auth={auth} user={user} billingPeriods={billingPeriods} />
          }
        />
        <Route
          path="/login"
          index
          element={<Login auth={auth} user={user} />}
        />
        <Route path="/logout" element={<Logout user={user} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
