import React, { useEffect, useState } from "react";
import "./Bills.scss";
import {
  collection,
  onSnapshot,
  query,
  where,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import { sortPeriodsByMonth } from "../../utils/features";
import { DataTableView } from "../../components/common/DataTableView";
import AddBill from "../../components/admin/templates/TemplateCreate";

function Bills() {
  const [billingYears, setBillingYears] = useState([]);
  const [activeYear, setActiveYear] = useState("");
  const [billingPeriods, setBillingPeriods] = useState([]);
  const [activePeriodId, setActivePeriodId] = useState("");
  const [billsList, setBillsList] = useState([]);
  const [editModeActive, setEditModeActive] = useState(false);
  const [selectedBillId, setSelectedBillId] = useState("");
  const firebase = useFirebase();
  const yearsRef = collection(firebase.firestore, "billingYears");
  const billingPeriodsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/billingPeriods"
  );
  const [billsRefPath, setBillsRefPath] = useState(
    "users/" + firebase.user.uid + "/billingPeriods"
  );
  const billsRef = collection(firebase.firestore, billsRefPath);

  useEffect(() => {
    onSnapshot(yearsRef, (snapshot) => {
      const years = snapshot.docs.map((doc) => doc.data().year);
      setBillingYears(years);
    });
  }, []);

  useEffect(() => {
    const q = query(billingPeriodsRef, where("year", "==", activeYear));
    onSnapshot(q, (snapshot) => {
      const periods = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBillingPeriods(sortPeriodsByMonth(periods));
    });
  }, [activeYear]);

  useEffect(() => {
    if (activePeriodId && activePeriodId !== "") {
      const billsRefPath =
        "users/" +
        firebase.user.uid +
        "/billingPeriods/" +
        activePeriodId +
        "/bills";
      setBillsRefPath(billsRefPath);
      const billsRef = collection(firebase.firestore, billsRefPath);
      onSnapshot(billsRef, (snapshot) => {
        const bills = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBillsList(bills);
      });
    }
  }, [activePeriodId]);

  const onEdit = (billId) => {
    setEditModeActive(!editModeActive);
    setSelectedBillId(billId);
  };

  const togglePaidStatus = (billId) => {
    const selectedBill = billsList.find((bill) => bill.id === billId);
    selectedBill.isPaid = !selectedBill.isPaid;
    const billDoc = doc(billsRef, billId);
    updateDoc(billDoc, {
      isPaid: selectedBill.isPaid,
    });
  };

  const deleteBill = (billId) => {
    const billDoc = doc(billsRef, billId);
    deleteDoc(billDoc);
  };

  const headers = [
    { name: "Nazwa", key: "name" },
    { name: "Kontrahent", key: "contractor" },
    { name: "Kwota", key: "amount" },
    { name: "Opłacony", key: "isPaid" },
    { name: "Akcje", key: "actions" },
  ];

  const actions = [
    {
      label: "Dodaj płatność",
      key: "addItem",
      editModeStatus: false,
    },
    {
      label: "Zapisz",
      key: "saveItem",
      editModeStatus: true,
    },
    {
      label: "Anuluj",
      key: "cancel",
      editModeStatus: true,
    },
  ];

  const tableActions = [
    {
      label: "Edytuj",
      actionEvent: onEdit,
    },
    {
      label: "Usuń",
      actionEvent: deleteBill,
    },
  ];

  const newBillPlaceholders = {
    name: "Nazwa płatności",
    contractor: "Kontrahent",
    amount: "Kwota",
  };

  console.log(billsList);
  console.log(billingPeriods);

  return (
    <React.Fragment>
      <div className="periodsContainer">
        <select
          defaultValue={"DEFAULT"}
          onChange={(e) => setActiveYear(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz rok...
          </option>
          {billingYears.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <select
          disabled={!activeYear ? true : false}
          defaultValue={"DEFAULT"}
          onChange={(e) => setActivePeriodId(e.target.value)}
        >
          <option hidden disabled value="DEFAULT">
            Wybierz okres rozliczeniowy...
          </option>
          {billingPeriods.map((period) => (
            <option key={period.id} value={period.id}>
              {period.month + " | " + period.name}
            </option>
          ))}
        </select>
      </div>

      {activePeriodId && (
        <AddBill
          editModeActive={editModeActive}
          setEditModeActive={setEditModeActive}
          selectedItem={billsList.find((bill) => bill.id === selectedBillId)}
          placeholders={newBillPlaceholders}
          itemType="bill"
          refPath={billsRefPath}
          actions={actions}
        />
      )}

      {activePeriodId && (
        <DataTableView
          headers={headers}
          data={billsList}
          actions={tableActions}
          togglePaidStatus={togglePaidStatus}
        />
      )}
    </React.Fragment>
  );
}

export default Bills;
