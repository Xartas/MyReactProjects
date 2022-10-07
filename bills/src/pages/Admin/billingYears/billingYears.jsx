import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { sortYears } from "../../../utils/features";

export function BillingYears() {
  const [billingYears, setBillingYears] = useState([]);
  const firebase = useFirebase();
  const yearsRef = collection(firebase.firestore, "billingYears");

  useEffect(() => {
    onSnapshot(yearsRef, (snapshot) => {
      const years = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingYears(sortYears(years));
    });
  }, []);

  const getLastYear = () => {
    const numberOfYears = billingYears.map((billingYear) =>
      Number(billingYear.year)
    );
    const lastYear = numberOfYears.reduce((a, b) => Math.max(a, b));
    return lastYear;
  };

  const addNewYear = () => {
    const lastYear = getLastYear();
    const newYear = {
      year: (lastYear + 1).toString(),
      billsImported: false,
    };
    addDoc(yearsRef, newYear);
  };

  const deleteYear = (yearId) => {
    const yearDoc = doc(firebase.firestore, "billingYears", yearId);
    deleteDoc(yearDoc);
    // dodać tutaj również usuwanie wszystkich powiązanyc okresów rozliczeniowych
    // dodać może pop-up?
  };

  return (
    <React.Fragment>
      <div className="creatingPeriodsContainer">
        <button onClick={() => addNewYear()}>
          Dodaj kolejny rok rozliczeniowy
        </button>
      </div>
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Rok</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {billingYears.map((year) => (
              <tr key={year.id}>
                <td key={year.id + "_year"}>{year.year}</td>
                <td>
                  <button onClick={() => deleteYear(year.id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
