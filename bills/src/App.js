import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Bills from "./pages/bills/Bills";
import Credits from "./pages/credits/Credits";
import Login from "./pages/login/Login";
import Logout from "./pages/logout/Logout";

function App({ auth, firestore }) {
  const [user, setUser] = useState(null);
  const [isDbInitialized, setIsDbInitialized] = useState(false);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!isDbInitialized) {
        setIsDbInitialized(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  if (!isDbInitialized) return <></>;

  if (user)
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" index element={<Bills auth={auth} />} />
          <Route path="/credits" element={<Credits auth={auth} />} />
        </Routes>
      </BrowserRouter>
    );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<Login auth={auth} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
