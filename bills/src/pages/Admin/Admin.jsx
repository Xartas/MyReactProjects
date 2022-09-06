import React from "react";
import "./Admin.scss";
import Navbar from "./../../components/navbar/Navbar";
import { Navigate } from "react-router-dom";

function Admin({ auth, user, billingPeriods }) {
  if (!user) {
    return <Navigate to="/login" />;
  }

  const toggleActive = (periodId) => {
    billingPeriods.find((period) => {
      period.id === periodId && (period.isActive = !period.isActive);
    });
  };

  console.log(billingPeriods);

  return (
    <React.Fragment>
      <Navbar auth={auth} />
      <div className="wrapper">
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
      </div>
    </React.Fragment>
  );
}

export default Admin;
