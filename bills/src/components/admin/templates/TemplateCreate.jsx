import React, { useState } from "react";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, addDoc } from "firebase/firestore";

export default function TemplateCreate({
  editModeActive,
  setEditModeActive,
  selectedTemplate,
}) {
  const [name, setName] = useState("");
  const [contractor, setContractor] = useState("");
  const [amount, setAmount] = useState("");
  const firebase = useFirebase();
  const templatesRef = collection(firebase.firestore, "templates");

  const addNewTemplate = () => {
    const newTemplate = {
      name: name,
      contractor: contractor,
      amount: Number(amount),
    };
    addDoc(templatesRef, newTemplate);
    setName("");
    setContractor("");
    setAmount("");
  };

  const onSave = () => {};
  return (
    <React.Fragment>
      <div className="creatingTemplatesContainer">
        <input
          placeholder="Nazwa szablonu..."
          //value={!editModeActive ? name : selectedTemplate.name}
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          placeholder="Kontrahent..."
          //value={editModeActive ? selectedTemplate.contractor : contractor}
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
        ></input>
        <input
          placeholder="Kwota..."
          //value={editModeActive ? selectedTemplate.amount : amount}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <button
          onClick={() => addNewTemplate()}
          disabled={editModeActive ? true : false}
        >
          Dodaj szablon
        </button>
        {editModeActive && (
          <>
            <button onClick={onSave}>Zapisz</button>
            <button onClick={() => setEditModeActive(!editModeActive)}>
              Anuluj
            </button>
          </>
        )}
      </div>
    </React.Fragment>
  );
}
