import React, { useState, useEffect } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function TemplateCreate({
  editModeActive,
  setEditModeActive,
  selectedItem,
  placeholders,
  itemType,
  refPath,
  actions,
}) {
  const [name, setName] = useState("");
  const [contractor, setContractor] = useState("");
  const [amount, setAmount] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const firebase = useFirebase();
  const itemRef = collection(firebase.firestore, refPath);

  console.log(refPath);

  useEffect(() => {
    if (editModeActive === true) {
      setName(selectedItem.name);
      setContractor(selectedItem.contractor);
      setAmount(selectedItem.amount);
    } else {
      setName("");
      setContractor("");
      setAmount("");
    }
  }, [editModeActive]);

  const addNewItem = () => {
    let newItem = {
      name: name,
      contractor: contractor,
      amount: Number(amount),
    };
    if (itemType === "bill") {
      newItem = {
        ...newItem,
        isPaid: isPaid,
      };
    }
    addDoc(itemRef, newItem);
    setName("");
    setContractor("");
    setAmount("");
    setIsPaid("");
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

  console.log(editModeActive);

  return (
    <React.Fragment>
      <div className="creatingTemplatesContainer">
        <input
          placeholder={placeholders.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          placeholder={placeholders.contractor}
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
        ></input>
        <input
          placeholder={placeholders.amount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        {actions.map((action) => {
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
        })}
      </div>
    </React.Fragment>
  );
}
