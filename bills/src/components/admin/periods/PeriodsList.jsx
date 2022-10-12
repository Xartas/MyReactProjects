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
import { periodsConstants } from "../../../utils/utils";
import DataTableView from "./../../../components/common/DataTableView";
import PeriodsCreate from "./PeriodsCreate";

export default function PeriodsList() {
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [paymentTemplates, setPaymentTemplates] = useState([]);
  const [selectedYear, setSelectedYear] = useState("");
  const firebase = useFirebase();

  useEffect(() => {
    const billingPeriodsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/billingPeriods"
    );
    const q = query(billingPeriodsRef, where("year", "==", selectedYear));
    onSnapshot(q, (snapshot) => {
      const periods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingPeriods(periods.sort((a, b) => (a.month > b.month ? 1 : -1)));
    });
  }, [selectedYear]);

  useEffect(() => {
    const paymentTemplatesRef = collection(firebase.firestore, "templates");
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
        headers={periodsConstants.tableHeaders}
        data={billingPeriods}
        actions={actions}
      />
    </React.Fragment>
  );
}
