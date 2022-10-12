import React, { useState, useEffect } from "react";

export default function InstallmentEdit({
  selectedInstallment,
  editModeActive,
  setEditModeActive,
  onSave,
}) {
  const [newPayDate, setNewPayDate] = useState();
  const [newPaidValue, setNewPaidValue] = useState();

  useEffect(() => {
    if (selectedInstallment) {
      setNewPayDate(selectedInstallment.payDate);
      setNewPaidValue(selectedInstallment.paidValue);
    }
  }, [selectedInstallment]);

  return (
    <React.Fragment>
      <div className="editInstallment">
        <input
          placeholder="Data płatności"
          value={newPayDate ? newPayDate : ""}
          onChange={(e) => setNewPayDate(e.target.value)}
        ></input>
        <input
          placeholder="Kwota"
          value={newPaidValue ? newPaidValue : ""}
          onChange={(e) => setNewPaidValue(e.target.value)}
        ></input>
        <button onClick={() => onSave(newPayDate, newPaidValue)}>Zapisz</button>
        <button onClick={() => setEditModeActive(!editModeActive)}>
          Anuluj
        </button>
      </div>
    </React.Fragment>
  );
}
