import React, { useState, useEffect } from "react";
import { useFirebase } from "../../contexts/FirebaseContext";
import "./Admin.scss";
import { collection, onSnapshot, addDoc } from "firebase/firestore";
import { months } from "../../utils/utils";

function Admin() {
  const [billingYears, setBillingYears] = useState([]);
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [activeYear, setActiveYear] = useState("");
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

  const createBillingPeriods = (year) => {
    const billingPeriodsTemp = months.map((month) => ({
      id: year + month.id,
      year: year,
      month: month.id,
      name: month.name,
      isActive: false,
    }));
    setBillingPeriods(billingPeriodsTemp);

    billingPeriodsTemp.map((period) => {
      addDoc(billingPeriodsRef, period);
    });
  };

  return (
    <React.Fragment>
      <div>
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
        <button onClick={() => createBillingPeriods(activeYear)}>
          Stwórz okresy rozliczeniowe
        </button>
      </div>

      {/* <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Month</th>
              <th>Name</th>
              <th>IsActive</th>
            </tr>
          </thead>
          <tbody>
            {billingPeriods.map((period) => (
              <tr key={period.id}>
                {Object.keys(period).map((key) => {
                  if (key === "isActive") {
                    return (
                      <td key={period.id + key}>
                        <input
                          type="checkbox"
                          onChange={() => toggleActive(period.id)}
                          defaultChecked={period[key] ? true : false}
                        />
                      </td>
                    );
                  } else {
                    return <td key={period.id + key}>{period[key]}</td>;
                  }
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}
    </React.Fragment>
  );
}

export default Admin;
