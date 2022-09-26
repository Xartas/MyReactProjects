import React from "react";
import "./Admin.scss";

function Admin() {
  return (
    <React.Fragment>
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
          {/* <tbody>
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
          </tbody> */}
        </table>
      </div>
    </React.Fragment>
  );
}

export default Admin;
