import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import "./billingPeriods.scss";
import {
  collection,
  onSnapshot,
  addDoc,
  query,
  where,
} from "firebase/firestore";
import { sortPeriodsByMonth } from "../../../utils/features";
import DataTableView from "./../../../components/common/DataTableView";
import PeriodsCreate from "./PeriodsCreate";

export default function PeriodsList() {
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [paymentTemplates, setPaymentTemplates] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const firebase = useFirebase();

  const billingPeriodsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/billingPeriods"
  );
  const paymentTemplatesRef = collection(firebase.firestore, "templates");

  useEffect(() => {
    const q = query(billingPeriodsRef, where("year", "==", selectedYear));
    onSnapshot(q, (snapshot) => {
      const periods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingPeriods(sortPeriodsByMonth(periods));
    });
  }, [selectedYear]);

  useEffect(() => {
    onSnapshot(paymentTemplatesRef, (snapshot) => {
      const templates = snapshot.docs.map((doc) => doc.data());
      setPaymentTemplates(templates);
    });
  }, []);

  const createBillsToPeriodFromTemplates = (periodId) => {
    const billsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/billingPeriods/" + periodId + "/bills"
    );

    const bills = paymentTemplates.map((template) => ({
      contractor: template.contractor,
      name: template.name,
      amount: template.amount,
      isPaid: false,
    }));

    bills.map((bill) => {
      addDoc(billsRef, bill);
    });
  };

  const headers = [
    { name: "ID Okresu", key: "billingPeriod" },
    { name: "Rok", key: "year" },
    { name: "Miesiąc", key: "month" },
    { name: "Nazwa", key: "name" },
    { name: "Akcje", key: "actions" },
  ];
  const actions = [
    {
      label: "Import płatności",
      actionEvent: createBillsToPeriodFromTemplates,
    },
  ];

  return (
    <React.Fragment>
      <PeriodsCreate
        setSelectedYear={setSelectedYear}
        billingPeriods={billingPeriods}
      />

      <DataTableView
        headers={headers}
        data={billingPeriods}
        actions={actions}
      />
    </React.Fragment>
  );
}
