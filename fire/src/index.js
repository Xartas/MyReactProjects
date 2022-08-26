import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAdS3Coss-jYeisrzjZzTAT5CVa9_wI44Q",
  authDomain: "firetest-f0bdb.firebaseapp.com",
  projectId: "firetest-f0bdb",
  storageBucket: "firetest-f0bdb.appspot.com",
  messagingSenderId: "555135915224",
  appId: "1:555135915224:web:91f2cd679fbad20ef1b3ad",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App auth={auth} firestore={firestore} />
  </React.StrictMode>
);
