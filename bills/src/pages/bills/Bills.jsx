import React, { useEffect, useState } from "react";
import "./Bills.scss";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { sortPeriodsByMonth } from "../../utils/features";

function Bills() {
  const [billingYears, setBillingYears] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [activePeriodId, setActivePeriodId] = useState("");
  const [billsList, setBillsList] = useState([]);
  const firebase = useFirebase();
  const yearsRef = collection(firebase.firestore, "billingYears");
  const billingPeriodsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/billingPeriods"
  );

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
    if (activePeriodId && activePeriodId !== "") {
      const billsRef = collection(
        firebase.firestore,
        "users/" +
          firebase.user.uid +
          "/billingPeriods/" +
          activePeriodId +
          "/bills"
      );
      onSnapshot(billsRef, (snapshot) => {
        const bills = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBillsList(bills);
      });
    }
  }, [activePeriodId]);

  const togglePaidStatus = (bill) => {
    bill.isPaid = !bill.isPaid;
    const billDoc = doc(
      firebase.firestore,
      "users/" +
        firebase.user.uid +
        "/billingPeriods/" +
        activePeriodId +
        "/bills",
      bill.id
    );
    updateDoc(billDoc, {
      ...bill,
    });
  };

  return (
    <React.Fragment>
      <div className="periodsContainer">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setActiveYear(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz rok...
          </option>
          {billingYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          disabled={!activeYear ? true : false}
          defaultValue={"DEFAULT"}
          onChange={(e) => setActivePeriodId(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz okres rozliczeniowy...
          </option>
          {billingPeriods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.month + " | " + period.name}
            </option>
          ))}
        </select>
      </div>

      {activePeriodId && (
        <div className="tableWrapper">
          <table>
            <thead>
              <tr>
                <th>Nazwa</th>
                <th>Kwota</th>
                <th>Opłacony?</th>
                <th>Płatności</th>
              </tr>
            </thead>
            <tbody>
              {billsList.map((bill) => (
                <tr key={bill.id}>
                  <td key={bill.id + "_name"}>{bill.name}</td>
                  <td key={bill.id + "_amount"}>{bill.amount}</td>
                  <td key={bill.id + "_isPaid"}>
                    <input
                      type="checkbox"
                      onChange={() => togglePaidStatus(bill)}
                    />
                  </td>
                  <td>
                    <button>Szczegóły</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </React.Fragment>
  );
}

export default Bills;
