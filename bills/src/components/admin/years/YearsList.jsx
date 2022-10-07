import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { sortYears } from "../../../utils/features";
import { DataTableView } from "../../../components/common/DataTableView";
import { YearCreate } from "./YearCreate";

export function YearsList() {
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
    const lastYear = numberOfYears.reduce((a, b) => Math.max(a, b), 0);
    return lastYear;
  };

  const deleteYear = (yearId) => {
    const yearDoc = doc(firebase.firestore, "billingYears", yearId);
    deleteDoc(yearDoc);
    // dodać tutaj również usuwanie wszystkich powiązanyc okresów rozliczeniowych
    // dodać może pop-up?
  };

  const headers = [
    { name: "Rok", key: "year" },
    { name: "Akcje", key: "actions" },
  ];
  const actions = [{ label: "Usuń", actionEvent: deleteYear }];

  return (
    <React.Fragment>
      <YearCreate lastYear={getLastYear()} />
      <DataTableView headers={headers} data={billingYears} actions={actions} />
    </React.Fragment>
  );
}
