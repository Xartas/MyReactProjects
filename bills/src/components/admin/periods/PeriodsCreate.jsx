import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import "./billingPeriods.scss";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { months } from "../../../utils/utils";

export default function PeriodsCreate({ setSelectedYear, billingPeriods }) {
  const [billingYears, setBillingYears] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const firebase = useFirebase();
  const yearsRef = collection(firebase.firestore, "billingYears");
  const billingPeriodsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/billingPeriods"
  );

  useEffect(() => {
    onSnapshot(yearsRef, (snapshot) => {
      const years = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingYears(years.sort((a, b) => (a.year > b.year ? 1 : -1)));
    });
  }, []);

  const onSelectYear = (value) => {
    setActiveYear(value);
    setSelectedYear(value);
  };

  const createBillingPeriods = (activeYear) => {
    const periods = months.map((month) => ({
      billingPeriod: activeYear + month.id,
      year: activeYear,
      month: month.id,
      name: month.name,
    }));
    periods.map((period) => {
      addDoc(billingPeriodsRef, period);
    });
    toggleBillsImportStatus(activeYear);
  };

  const toggleBillsImportStatus = (activeYear) => {
    const yearToUpdate = billingYears.find((by) => by.year === activeYear);
    yearToUpdate.billsImported = !yearToUpdate.billsImported;

    const yearDoc = doc(firebase.firestore, "billingYears", yearToUpdate.id);
    updateDoc(yearDoc, {
      year: yearToUpdate.year,
      billsImported: yearToUpdate.billsImported,
    });
  };

  const onDelete = (activeYear) => {
    billingPeriods.map((bp) => {
      if (bp.year === activeYear) {
        const bpDoc = doc(
          firebase.firestore,
          "users/" + firebase.user.uid + "/billingPeriods",
          bp.id
        );
        deleteDoc(bpDoc);
      }
    });
    toggleBillsImportStatus(activeYear);
  };

  const disableCreatingBillingPeriods = () => {
    const year = billingYears.find((by) => by.year === activeYear);
    return year ? year.billsImported : true;
  };

  return (
    <React.Fragment>
      <div className="creatingPeriodsContainer">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => onSelectYear(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz rok
          </option>
          {billingYears.map((by) => (
            <option key={by.year} value={by.year}>
              {by.year}
            </option>
          ))}
        </select>
        <button
          onClick={() => createBillingPeriods(activeYear)}
          disabled={
            !activeYear || activeYear === ""
              ? true
              : disableCreatingBillingPeriods()
          }
        >
          Stwórz okresy rozliczeniowe
        </button>
        <button
          onClick={() => onDelete(activeYear)}
          disabled={
            !activeYear || activeYear === ""
              ? true
              : !disableCreatingBillingPeriods()
          }
        >
          Usuń wszystkie okresy
        </button>
      </div>
    </React.Fragment>
  );
}
