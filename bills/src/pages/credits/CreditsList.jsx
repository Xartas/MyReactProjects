import React from "react";
import { DataTableView } from "../../components/common/DataTableView";

export default function CreditsList({
  credits,
  setSelectedCreditId,
  onDelete,
}) {
  const tableHeaders = [
    { name: "Tytuł", key: "title" },
    { name: "Akcje", key: "actions" },
  ];

  const tableActions = [
    {
      label: "Szczegóły",
      actionEvent: setSelectedCreditId,
    },
    {
      label: "Usuń",
      actionEvent: onDelete,
    },
  ];

  return (
    <React.Fragment>
      <div className="creditList">
        <DataTableView
          headers={tableHeaders}
          actions={tableActions}
          data={credits}
        />
      </div>
    </React.Fragment>
  );
}
