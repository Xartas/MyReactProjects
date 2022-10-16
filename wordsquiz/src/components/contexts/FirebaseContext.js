import React, { useState, useEffect, createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDHQh1DEeXa-qvLzzMvQEPe6GhKLeYqA2g",
  authDomain: "wordsquiz-57e35.firebaseapp.com",
  projectId: "wordsquiz-57e35",
  storageBucket: "wordsquiz-57e35.appspot.com",
  messagingSenderId: "872134822492",
  appId: "1:872134822492:web:12d7be9ad229e9a2f03499",
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
