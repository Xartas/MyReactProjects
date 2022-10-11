import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  startAt,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { DataTableView } from "../../components/common/DataTableView";
import "./Credits.scss";

export default function InstallmentsList({ credit, setUpdatedCredit }) {
  const [installments, setInstallments] = useState([]);
  const [page, setPage] = useState(0);
  const [editModeActive, setEditModeActive] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState();
  const [newPayDate, setNewPayDate] = useState();
  const [newPaidValue, setNewPaidValue] = useState();
  const firebase = useFirebase();
  const installmentsVisibleLimit = 10;
  const installmentsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/credits/" + credit.id + "/installments"
  );

  useEffect(() => {
    viewNextPage();
  }, [credit.id, page]);

  useEffect(() => {
    console.log(selectedInstallment);
    if (selectedInstallment) {
      setNewPayDate(selectedInstallment.payDate);
      setNewPaidValue(selectedInstallment.paidValue);
    }
  }, [selectedInstallment]);

  const viewNextPage = () => {
    const q = query(
      installmentsRef,
      orderBy("number"),
      startAt(page * installmentsVisibleLimit + 1),
      limit(installmentsVisibleLimit)
    );
    onSnapshot(q, (snapshot) => {
      const installmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstallments(installmentsData);
    });
  };

  const onEdit = (installmentId) => {
    !editModeActive && setEditModeActive(!editModeActive);
    setSelectedInstallment(
      installments.find((installment) => installment.id === installmentId)
    );
  };

  const isFullyPaid = () => {
    if (selectedInstallment.value - newPaidValue === 0) {
      return true;
    } else return false;
  };

  const recountCredit = () => {
    let unpaidSum = 0;
    let installmentsPaid = 0;
    onSnapshot(installmentsRef, (snapshot) => {
      const installments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(installments);
      installments.map((installment) => {
        console.log(
          "Dodawanie dla " +
            installment.id +
            " : " +
            unpaidSum +
            " + " +
            installment.unpaidValue
        );
        unpaidSum = unpaidSum + installment.unpaidValue;
        console.log("Suma po dodaniu: " + unpaidSum);
        console.log("Stan opłacenia: " + installment.fullyPaid);
        installment.fullyPaid
          ? (installmentsPaid = +1)
          : (installmentsPaid = +0);
        console.log(installmentsPaid);
      });
      updateCredit(unpaidSum, installmentsPaid);
    });
  };

  const updateCredit = (unpaidSum, installmentsPaid) => {
    console.log("UnpaidSum: " + unpaidSum);
    console.log("InstallmentsPaid: " + installmentsPaid);
    let updatedCredit = {
      ...credit,
      unpaidValue: unpaidSum,
      installmentsPaid: installmentsPaid,
      installmentsUnpaid: credit.installmentsCount - installmentsPaid,
    };
    console.log("UpdatedCredit:");
    console.log(updatedCredit);
    setUpdatedCredit(updatedCredit);
  };

  const onSave = () => {
    const installmentDoc = doc(installmentsRef, selectedInstallment.id);
    updateDoc(installmentDoc, {
      payDate: newPayDate,
      paidValue: newPaidValue,
      unpaidValue: selectedInstallment.value - newPaidValue,
      fullyPaid: isFullyPaid(),
    });
    recountCredit();
    setEditModeActive(false);
  };

  const tableHeaders = [
    { name: "Numer raty", key: "number" },
    { name: "Data wymagalności", key: "paymentDeadline" },
    { name: "Kwota raty", key: "value" },
    { name: "Data ostatniej płatności", key: "payDate" },
    { name: "Kwota opłacona", key: "paidValue" },
    { name: "Pozostało do spłaty", key: "unpaidValue" },
    { name: "W pełni opłacona?", key: "fullyPaid" },
    { name: "Akcje", key: "actions" },
  ];

  const tableActions = [
    {
      label: "Edytuj",
      actionEvent: onEdit,
    },
  ];

  return (
    <React.Fragment>
      <div className="installmentList">
        {editModeActive && (
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
            <button onClick={() => onSave()}>Zapisz</button>
            <button onClick={() => setEditModeActive(!editModeActive)}>
              Anuluj
            </button>
          </div>
        )}
        <DataTableView
          headers={tableHeaders}
          actions={tableActions}
          data={installments}
        />
        <div className="paginationButtons">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 0 || editModeActive}
          >
            &lt;&lt; Poprzednia"
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={
              (page + 1) * installmentsVisibleLimit + 1 >
                credit.installmentsCount || editModeActive
            }
          >
            Następna &gt;&gt;
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}
