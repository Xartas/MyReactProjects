import React from "react";
import { DataTableView } from "../../components/common/DataTableView";

export default function CreditsList({
  credits,
  setSelectedCredit,
  onDelete,
  editModeActive,
  setEditModeActive,
  setSelectedCreditId,
}) {
  const onEdit = (creditId) => {
    setEditModeActive(!editModeActive);
    setSelectedCredit(credits.find((credit) => credit.id === creditId));
  };

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
    {
      label: "Edytuj",
      actionEvent: onEdit,
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
