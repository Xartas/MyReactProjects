import React, { useState, useEffect } from "react";
import "./billingTemplates.scss";
import { useFirebase } from "../../../contexts/FirebaseContext";
import {
  collection,
  onSnapshot,
  addDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { sortTemplates } from "../../../utils/features";

export function BillsTemplates() {
  const [templates, setTemplates] = useState([]);
  const [name, setName] = useState("");
  const [contractor, setContractor] = useState("");
  const [amount, setAmount] = useState("");
  const firebase = useFirebase();
  const templatesRef = collection(firebase.firestore, "templates");

  useEffect(() => {
    onSnapshot(templatesRef, (snapshot) => {
      const templates = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setTemplates(sortTemplates(templates));
    });
  }, []);

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

  const deleteTemplate = (templateId) => {
    const templateDoc = doc(firebase.firestore, "templates", templateId);
    deleteDoc(templateDoc);
  };

  return (
    <React.Fragment>
      <div className="creatingTemplatesContainer">
        <input
          placeholder="Nazwa szablonu..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <input
          placeholder="Kontrahent..."
          value={contractor}
          onChange={(e) => setContractor(e.target.value)}
        ></input>
        <input
          placeholder="Kwota..."
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        ></input>
        <button onClick={() => addNewTemplate()}>Dodaj szablon</button>
      </div>

      <div className="tableWrapper">
        <table>
          <thead>
            <tr>
              <th>Nazwa</th>
              <th>Kontrahent</th>
              <th>Kwota</th>
              <th>Akcje</th>
            </tr>
          </thead>
          <tbody>
            {templates.map((template) => (
              <tr key={template.id}>
                <td key={template.id + "_name"}>{template.name}</td>
                <td key={template.id + "_contractor"}>{template.contractor}</td>
                <td key={template.id + "_amount"}>{template.amount}</td>
                <td>
                  <button>Edytuj</button>
                  <button onClick={() => deleteTemplate(template.id)}>
                    Usuń
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );
}
