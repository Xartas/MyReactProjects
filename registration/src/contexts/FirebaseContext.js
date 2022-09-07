import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBqIs36Q82ycsGoBIZEJYBaxsQcF2Nhry0",
  authDomain: "registration-84a95.firebaseapp.com",
  projectId: "registration-84a95",
  storageBucket: "registration-84a95.appspot.com",
  messagingSenderId: "1023811889774",
  appId: "1:1023811889774:web:ef873008b76d733056147f",
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
