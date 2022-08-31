import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHrY9OV2HsyQUY-KA_KL9LrXd7YsgODq4",
  authDomain: "bills-manager-58f17.firebaseapp.com",
  projectId: "bills-manager-58f17",
  storageBucket: "bills-manager-58f17.appspot.com",
  messagingSenderId: "882770356268",
  appId: "1:882770356268:web:641dbc823bb9cc7eebc989",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App auth={auth} firestore={firestore} />);
