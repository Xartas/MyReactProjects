import React, { useState, useEffect } from "react";
import { useFirebase } from "../../contexts/FirebaseContext";
import "./Admin.scss";
import {
  collection,
  onSnapshot,
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
} from "firebase/firestore";
import { months } from "../../utils/utils";
import { sortPeriodsByMonth } from "../../utils/features";

function Admin() {
  const [billingYears, setBillingYears] = useState([]);
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [paymentTemplates, setPaymentTemplates] = useState([]);
  const firebase = useFirebase();

  const yearsRef = collection(firebase.firestore, "billingYears");
  const billingPeriodsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/billingPeriods"
  );

  const paymentTemplatesRef = collection(firebase.firestore, "templates");

  useEffect(() => {
    onSnapshot(yearsRef, (snapshot) => {
      const years = snapshot.docs.map((doc) => doc.data().year);
      setBillingYears(years);
    });
  }, []);

  useEffect(() => {
    const q = query(billingPeriodsRef, where("year", "==", activeYear));
    onSnapshot(q, (snapshot) => {
      const periods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingPeriods(sortPeriodsByMonth(periods));
    });
  }, [activeYear]);

  useEffect(() => {
    onSnapshot(paymentTemplatesRef, (snapshot) => {
      const templates = snapshot.docs.map((doc) => doc.data());
      setPaymentTemplates(templates);
    });
  }, []);

  const createBillingPeriods = (year) => {
    const periods = months.map((month) => ({
      billingPeriod: year + month.id,
      year: year,
      month: month.id,
      name: month.name,
      isActive: false,
    }));
    periods.map((period) => {
      addDoc(billingPeriodsRef, period);
    });
  };

  const toggleActive = (period) => {
    period.isActive = !period.isActive;
    const periodDoc = doc(
      firebase.firestore,
      "users/" + firebase.user.uid + "/billingPeriods",
      period.id
    );
    updateDoc(periodDoc, {
      ...period,
    });
  };

  const createBillsToPeriodFromTemplates = (period) => {
    const billsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/billingPeriods/" + period.id + "/bills"
    );

    const bills = paymentTemplates.map((template) => ({
      contractor: template.contractor,
      name: template.name,
      amount: template.amount,
      isPaid: false,
    }));

    bills.map((bill) => {
      addDoc(billsRef, bill);
    });
  };

  const deletePeriod = (periodId) => {
    const periodDoc = doc(
      firebase.firestore,
      "users/" + firebase.user.uid + "/billingPeriods",
      periodId
    );
    deleteDoc(periodDoc);
  };

  return (
    <React.Fragment>
      <div className="creatingPeriodsContainer">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setActiveYear(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz rok
          </option>
          {billingYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <button
          onClick={() => createBillingPeriods(activeYear)}
          disabled={activeYear ? false : true}
        >
          Stwórz okresy rozliczeniowe
        </button>
      </div>

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>ID okresu</th>
              <th>Rok</th>
              <th>Miesiąc</th>
              <th>Nazwa</th>
              <th>Aktywny</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {billingPeriods.map((period) => (
              <tr key={period.id}>
                <td key={period.id + "_id"}>{period.billingPeriod}</td>
                <td key={period.id + "_year"}>{period.year}</td>
                <td key={period.id + "_month"}>{period.month}</td>
                <td key={period.id + "_name"}>{period.name}</td>
                <td key={period.id + "_isActive"}>
                  <input
                    type="checkbox"
                    onChange={() => toggleActive(period)}
                    defaultChecked={period.isActive ? true : false}
                  />
                </td>
                <td>
                  <button
                    onClick={() => createBillsToPeriodFromTemplates(period)}
                  >
                    Importuj płatności
                  </button>
                  <button onClick={() => deletePeriod(period.id)}>Usuń</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}

export default Admin;
