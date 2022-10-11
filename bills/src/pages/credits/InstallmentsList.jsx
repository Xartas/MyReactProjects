import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  limit,
  startAt,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { DataTableView } from "../../components/common/DataTableView";

export default function InstallmentsList({ credit }) {
  const [installments, setInstallments] = useState([]);
  const [page, setPage] = useState(0);
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
      actionEvent: "",
    },
  ];

  return (
    <React.Fragment>
      <div className="installmentList">
        <DataTableView
          headers={tableHeaders}
          actions={tableActions}
          data={installments}
        />
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Poprzednia
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={
            (page + 1) * installmentsVisibleLimit + 1 > credit.installmentsCount
          }
        >
          Następna
        </button>
      </div>
    </React.Fragment>
  );
}
