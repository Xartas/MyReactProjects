import React, { useEffect, useState } from "react";
import "./Bills.scss";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { sortPeriodsByMonth } from "../../utils/features";

function Bills() {
  const [billingYears, setBillingYears] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [activePeriod, setActivePeriod] = useState("");
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

  return (
    <React.Fragment>
      <div className="creatingPeriodsContainer">
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
          onChange={(e) => setActivePeriod(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz okres rozliczeniowy...
          </option>
          {billingPeriods.map((period) => (
            <option key={period.id} value={period.billingPeriod}>
              {period.month + " | " + period.name}
            </option>
          ))}
        </select>
      </div>

      <div className="container">Rachunki</div>
    </React.Fragment>
  );
}

export default Bills;
