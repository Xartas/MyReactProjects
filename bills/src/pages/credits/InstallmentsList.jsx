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
import { installmentsConstants } from "../../utils/utils";
import DataTableView from "../../components/common/DataTableView";
import InstallmentEdit from "./InstallmentEdit";
import "./Credits.scss";

export default function InstallmentsList({ credit, setUpdatedCredit }) {
  const [installments, setInstallments] = useState([]);
  const [page, setPage] = useState(0);
  const [editModeActive, setEditModeActive] = useState(false);
  const [selectedInstallment, setSelectedInstallment] = useState();
  const firebase = useFirebase();
  const installmentsVisibleLimit = 10;
  const installmentsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/credits/" + credit.id + "/installments"
  );

  useEffect(() => {
    viewNextPage();
  }, [credit.id, page]);

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

  const isFullyPaid = (newPaidValue) => {
    if (selectedInstallment.value - newPaidValue === 0) {
      return true;
    } else return false;
  };

  const onSave = (newPayDate, newPaidValue) => {
    const installmentDoc = doc(installmentsRef, selectedInstallment.id);
    updateDoc(installmentDoc, {
      payDate: newPayDate,
      paidValue: Number(newPaidValue),
      unpaidValue: Number(selectedInstallment.value - newPaidValue),
      fullyPaid: isFullyPaid(newPaidValue),
    });

    recountCredit();
    setEditModeActive(false);
  };

  const recountCredit = () => {
    const q = query(installmentsRef, orderBy("number"));
    onSnapshot(q, (snapshot) => {
      let unpaidSum = 0;
      let installmentsPaid = 0;
      const installments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      installments.map((installment) => {
        unpaidSum = unpaidSum + installment.unpaidValue;
        installment.fullyPaid
          ? (installmentsPaid = installmentsPaid + 1)
          : (installmentsPaid = installmentsPaid + 0);
      });
      updateCredit(unpaidSum, installmentsPaid);
    });
  };

  const updateCredit = (unpaidSum, installmentsPaid) => {
    let updatedCredit = {
      ...credit,
      unpaidValue: Number(unpaidSum),
      installmentsPaid: Number(installmentsPaid),
      installmentsUnpaid: Number(credit.installmentsCount - installmentsPaid),
    };
    setUpdatedCredit(updatedCredit);
  };

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
          <InstallmentEdit
            selectedInstallment={selectedInstallment}
            editModeActive={editModeActive}
            setEditModeActive={setEditModeActive}
            onSave={onSave}
          />
        )}
        <DataTableView
          headers={installmentsConstants.tableHeaders}
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
