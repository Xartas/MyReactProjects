import React, { useState, useEffect } from "react";
import "./billingTemplates.scss";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { sortTemplates } from "../../../utils/features";
import { DataTableView } from "./../../common/DataTableView";
import TemplateCreate from "./TemplateCreate";

export default function TemplatesList() {
  const [templates, setTemplates] = useState([]);
  const [editModeActive, setEditModeActive] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState("");
  const firebase = useFirebase();
  const templatesRef = collection(firebase.firestore, "templates/");

  useEffect(() => {
    onSnapshot(templatesRef, (snapshot) => {
      const templates = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Stała w useEffect:");
      console.log(templates);
      //setTemplates(templates);
    });
  }, []);
  console.log("Stan:");
  console.log(templates);

  const onEdit = (templateId) => {
    setEditModeActive(!editModeActive);
    setSelectedTemplateId(templateId);
  };

  const onDelete = (templateId) => {
    const templateDoc = doc(firebase.firestore, "templates", templateId);
    deleteDoc(templateDoc);
  };

  const headers = [
    { name: "Nazwa", key: "name" },
    { name: "Kontrahent", key: "contractor" },
    { name: "Kwota", key: "amount" },
    { name: "Akcje", key: "actions" },
  ];
  const actions = [
    {
      label: "Edytuj",
      actionEvent: onEdit,
    },
    {
      label: "Usuń",
      actionEvent: onDelete,
    },
  ];
  return (
    <React.Fragment>
      <TemplateCreate
        editModeActive={editModeActive}
        setEditModeActive={setEditModeActive}
        selectedTemplate={templates.find(
          (template) => (template.id = selectedTemplateId)
        )}
      />
      <DataTableView headers={headers} data={templates} actions={actions} />
    </React.Fragment>
  );
}
