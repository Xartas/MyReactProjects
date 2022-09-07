import React, { useState, useEffect } from "react";
import "./Bills.scss";
import Navbar from "./../../components/navbar/Navbar";
import { Navigate } from "react-router-dom";

function Bills({ auth, user, billingPeriods }) {
  const [selectedPeriod, setSelectedPeriod] = useState("");

  if (!user) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {}, [selectedPeriod]);

  return (
    <React.Fragment>
      <Navbar auth={auth} />
      <div className="container">
        <select onChange={(e) => setSelectedPeriod(e.target.value)}>
          {billingPeriods.map((period) => {
            if (period.isActive)
              return (
                <option key={period.id} value={period.id}>
                  {period.name}
                </option>
              );
          })}
        </select>
      </div>
    </React.Fragment>
  );
}

export default Bills;
