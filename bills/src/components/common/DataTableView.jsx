import React from "react";

export function DataTableView({ headers, data, actions }) {
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
                {headers.map((header, j) =>
                  header.key !== "actions" ? (
                    <td key={dataObject.id + "_" + i + "_" + j}>
                      {dataObject[header.key]}
                    </td>
                  ) : (
                    <td key={dataObject.id + "_" + i + "_" + j}>
                      {actions.map((action, k) => (
                        <button
                          key={dataObject.id + "_" + k}
                          onClick={() => action.actionEvent(dataObject.id)}
                        >
                          {action.label}
                        </button>
                      ))}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
