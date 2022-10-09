import React, { useState } from "react";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

export default function CreditCreate() {
  const [title, setTitle] = useState("asda");
  const [description, setDescription] = useState("asdasd");
  const [installmentsCount, setInstallmentsCount] = useState("10");
  const [installmentsPaid, setInstallmentsPaid] = useState("");
  const [installmentsUnpaid, setInstallmentsUnpaid] = useState("");
  const [firstPaymentDate, setFirstPaymentDate] = useState("01-01-2022");
  const [value, setValue] = useState("150");
  const [unpaidValue, setUnpaidValue] = useState("");
  const firebase = useFirebase();
  const creditsRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/credits"
  );

  //   useEffect(() => {
  //     if (editModeActive === true) {
  //       setName(selectedItem.name);
  //       setContractor(selectedItem.contractor);
  //       setAmount(selectedItem.amount);
  //     } else {
  //       setName("");
  //       setContractor("");
  //       setAmount("");
  //     }
  //   }, [editModeActive]);

  const addNewCredit = () => {
    let credit = {
      title: title,
      description: description,
      installmentsCount: Number(installmentsCount),
      installmentsPaid: 0,
      installmentsUnpaid: Number(installmentsCount),
      value: Number(value),
      unpaidValue: Number(value),
    };
    addDoc(creditsRef, credit);
    // dodać tutaj czyszczenie pól po dodaniu kredytu
  };

  const onSave = (selectedItem) => {
    const itemDoc = doc(itemRef, selectedItem.id);
    updateDoc(itemDoc, {
      name: name,
      contractor: contractor,
      amount: Number(amount),
    });
    setEditModeActive(false);
  };

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
        <input
          placeholder="Data pierwszej płatności"
          value={firstPaymentDate}
          onChange={(e) => setFirstPaymentDate(e.target.value)}
        ></input>
        <button onClick={addNewCredit}>Dodaj</button>
        {/* {actions.map((action) => {
          if (
            action.key === "addItem" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => addNewItem()}>
                {action.label}
              </button>
            );
          } else if (
            action.key === "saveItem" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => onSave(selectedItem)}>
                {action.label}
              </button>
            );
          } else if (
            action.key === "cancel" &&
            action.editModeStatus === editModeActive
          ) {
            return (
              <button key={action.key} onClick={() => onSave(selectedItem)}>
                {action.label}
              </button>
            );
          }
        })} */}
      </div>
    </React.Fragment>
  );
}
