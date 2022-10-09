import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { DataTableView } from "../../components/common/DataTableView";

export default function InstallmentsList({ creditId }) {
  const [installments, setInstallments] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const installmentsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits/" + creditId + "/installments"
    );
    onSnapshot(installmentsRef, (snapshot) => {
      const installmentsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInstallments(installmentsData);
    });
  }, [creditId]);

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
      </div>
    </React.Fragment>
  );
}
