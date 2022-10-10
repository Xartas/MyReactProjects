import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  doc,
  orderBy,
  query,
  limit,
  startAfter,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { DataTableView } from "../../components/common/DataTableView";

export default function InstallmentsList({ creditId }) {
  const [installments, setInstallments] = useState([]);
  const [lastVisibleInstallmentId, setLastVisibleInstallmentId] = useState();
  const firebase = useFirebase();
  const installmentsVisibleLimit = 10;
  const installmentsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/credits/" + creditId + "/installments"
  );

  useEffect(() => {
    const q = query(
      installmentsRef,
      orderBy("number"),
      limit(installmentsVisibleLimit)
    );
    onSnapshot(q, (snapshot) => {
      const installmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstallments(installmentsData);
    });
  }, [creditId]);

  useEffect(() => {
    installments.length > 0 &&
      setLastVisibleInstallmentId(installments[installments.length - 1].id);
    // console.log(installments);
    // console.log(lastVisibleInstallmentId);
  }, [installments]);

  const viewNextPage = () => {
    const q = query(
      installmentsRef,
      orderBy("number"),
      startAfter(doc.id === lastVisibleInstallmentId), // nie działa - do poprawki.
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
        <button>Poprzednia</button>
        <button onClick={() => viewNextPage()}>Następna</button>
      </div>
    </React.Fragment>
  );
}
