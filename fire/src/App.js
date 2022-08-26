import { useState, useEffect } from "react";
import Home from "./Home";
import Login from "./Login";

function App({ auth, firestore }) {
  const [initialized, setInitialized] = useState(false);
  const [user, setUser] = useState(null);
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!initialized) {
        setInitialized(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  if (!initialized) return <></>;

  if (user) return <Home user={user} auth={auth} firestore={firestore} />;

  return <Login auth={auth} />;
}

export default App;
