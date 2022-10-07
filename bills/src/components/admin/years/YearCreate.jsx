import React from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, addDoc } from "firebase/firestore";

export function YearCreate({ lastYear }) {
  const firebase = useFirebase();
  const yearsRef = collection(firebase.firestore, "billingYears");

  const addNewYear = () => {
    const newYear = {
      year: (lastYear + 1).toString(),
      billsImported: false,
    };
    addDoc(yearsRef, newYear);
  };

  return (
    <React.Fragment>
      <div className="creatingPeriodsContainer">
        <button onClick={() => addNewYear()}>
          Dodaj kolejny rok rozliczeniowy
        </button>
      </div>
    </React.Fragment>
  );
}
