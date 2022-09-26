import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHrY9OV2HsyQUY-KA_KL9LrXd7YsgODq4",
  authDomain: "bills-manager-58f17.firebaseapp.com",
  projectId: "bills-manager-58f17",
  storageBucket: "bills-manager-58f17.appspot.com",
  messagingSenderId: "882770356268",
  appId: "1:882770356268:web:641dbc823bb9cc7eebc989",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const FirebaseContext = createContext();
export const FirebaseProvider = ({ children }) => {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!isAuthInitialized) {
        setIsAuthInitialized(true);
      }
    });
    // eslint-disable-next-line
  }, []);

  return (
    <FirebaseContext.Provider value={{ auth, firestore, user }}>
      {isAuthInitialized && children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => {
  return useContext(FirebaseContext);
};
