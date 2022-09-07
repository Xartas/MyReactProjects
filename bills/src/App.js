import { collection, getDocs } from "firebase/firestore";
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
  const [users, setUsers] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);
  const [billingPeriods, setBillingPeriods] = useState([]);
  const usersCollectionRef = collection(firestore, "users");

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
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((user) => ({ ...user.data(), id: user.id })));
    };

    getUsers();
  }, []);

  console.log(user);

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
