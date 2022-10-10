import React, { useState, useEffect } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

export default function CreditCreate({
  editModeActive,
  selectedCredit,
  setEditModeActive,
}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [installmentsCount, setInstallmentsCount] = useState(10);
  const [installmentsPaid, setInstallmentsPaid] = useState("");
  const [installmentsUnpaid, setInstallmentsUnpaid] = useState("");
  const [firstPaymentDate, setFirstPaymentDate] = useState("");
  const [value, setValue] = useState("");
  const [unpaidValue, setUnpaidValue] = useState("");
  const firebase = useFirebase();
  const creditsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/credits"
  );

  useEffect(() => {
    if (editModeActive === true) {
      setTitle(selectedCredit.title);
      setDescription(selectedCredit.description);
      setInstallmentsCount(selectedCredit.installmentsCount);
      setValue(selectedCredit.value);
      setFirstPaymentDate(selectedCredit.firstPaymentDate);
    } else {
      setTitle("");
      setDescription("");
      setInstallmentsCount("");
      setValue("");
      setFirstPaymentDate("");
    }
  }, [editModeActive]);

  const addCredit = () => {
    let credit = {
      title: title,
      description: description,
      installmentsCount: Number(installmentsCount),
      installmentsPaid: 0,
      installmentsUnpaid: Number(installmentsCount),
      value: Number(value),
      unpaidValue: Number(value),
    };
    addDoc(creditsRef, credit)
      .then(function (creditRef) {
        createInstallmentsForNewCredit(credit, creditRef.id);
      })
      .catch(function (error) {
        console.error("Błąd przy dodawaniu kredytu: ", error);
      });
    // dodać tutaj czyszczenie pól po dodaniu kredytu
  };

  const onSave = (credit) => {
    const creditDoc = doc(creditsRef, credit.id);
    updateDoc(creditDoc, {
      title: title,
      description: description,
      installmentsCount: Number(installmentsCount),
      installmentsUnpaid: Number(installmentsCount - installmentsPaid),
      value: Number(value),
      //unpaidValue: Number(value), <--- tutaj się zastanowic
    });
    setEditModeActive(false);
  };

  const createInstallmentsForNewCredit = (credit, creditId) => {
    const installmentsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits/" + creditId + "/installments"
    );
    for (let i = 0; i < credit.installmentsCount; i++) {
      const installment = {
        number: Number(i + 1),
        paymentDeadline: firstPaymentDate, // tutaj trzeba będzie przerobić na instancję klase Date / setDate, setMonth
        value: credit.value / installmentsCount,
        payDate: "",
        paidValue: 0,
        unpaidValue: credit.value / installmentsCount,
        fullyPaid: false,
      };
      addDoc(installmentsRef, installment);
    }
  };

  const actions = [
    {
      label: "Dodaj kredyt",
      key: "addCredit",
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
  return (
    <React.Fragment>
      <div className="creatingCreditContainer">
        <input
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        ></input>
        <input
          placeholder="Opis kredytu"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></input>
        <input
          placeholder="Ilość rat"
          value={installmentsCount}
          onChange={(e) => setInstallmentsCount(e.target.value)}
        ></input>
        <input
          placeholder="Wartość kredytu"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        ></input>
        {!editModeActive && (
          <input
            placeholder="Data pierwszej płatności"
            value={firstPaymentDate !== undefined ? firstPaymentDate : ""}
            onChange={(e) => setFirstPaymentDate(e.target.value)}
          ></input>
        )}
        {actions.map((action) => {
          if (
            action.key === "addCredit" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => addCredit()}>
                {action.label}
              </button>
            );
          } else if (
            action.key === "saveItem" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => onSave(selectedCredit)}>
                {action.label}
              </button>
            );
          } else if (
            action.key === "cancel" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => onSave(selectedCredit)}>
                {action.label}
              </button>
            );
          }
        })}
      </div>
    </React.Fragment>
  );
}
