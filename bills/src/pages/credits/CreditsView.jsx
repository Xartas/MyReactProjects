import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import "./Credits.scss";
import CreditsList from "./CreditsList";

function Credits() {
  const [credits, setCredits] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const creditsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits"
    );
    onSnapshot(creditsRef, (snapshot) => {
      const creditsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCredits(creditsData);
    });
  }, []);

  return (
    <React.Fragment>
      <div className="container">
        <div className="creditContainer">
          <div className="creditList">
            <CreditsList credits={credits} />
          </div>
          <div className="creditDetails">
            <p className="creditTitle">Tytuł kredytu</p>
            <p className="creditDescription">Opis umowy</p>
            <div className="financeData">
              <p>Kwota kredytu: </p>
              <p>Ilosć rat: </p>
              <p>Pozostało do spłaty: </p>
              <p>Ilosć rat opłaconych: </p>
              <p>Ilość rat nieopłaconych: </p>
            </div>
          </div>
        </div>
        <div className="isntallmentsContainer">
          <div className="installmentList">Lista rat kredytu</div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Credits;
