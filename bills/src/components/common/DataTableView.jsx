import React from "react";
import "./navbar/Navbar.scss";

export function DataTableView({ headers, data, actions, togglePaidStatus }) {
  return (
    <React.Fragment>
      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.name}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((dataObject, i) => (
              <tr key={dataObject.id + "_" + i}>
                {headers.map((header, j) => {
                  if (header.key !== "actions" && header.key !== "isPaid") {
                    return (
                      <td key={dataObject.id + "_" + i + "_" + j}>
                        {dataObject[header.key]}
                      </td>
                    );
                  } else if (header.key === "actions") {
                    return (
                      <td key={dataObject.id + "_" + i + "_" + j}>
                        {actions.map((action, k) => (
                          <button
                            key={dataObject.id + "_" + i + "_" + j + "_" + k}
                            onClick={() => action.actionEvent(dataObject.id)}
                          >
                            {action.label}
                          </button>
                        ))}
                      </td>
                    );
                  } else if (header.key === "isPaid") {
                    return (
                      <td key={dataObject.id + "_" + i + "_" + j}>
                        <input
                          type="checkbox"
                          className="paidCheckbox"
                          onChange={() => togglePaidStatus(dataObject.id)}
                          defaultChecked={dataObject.isPaid}
                        />
                      </td>
                    );
                  } else if (header.key === "fullyPaid") {
                    return (
                      <td key={dataObject.id + "_" + i + "_" + j}>
                        {dataObject.fullyPaid ? "TAK" : "NIE"}
                      </td>
                    );
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
