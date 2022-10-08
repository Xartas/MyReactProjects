import React, { useState, useEffect } from "react";
import "./billingTemplates.scss";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { sortTemplates } from "../../../utils/features";
import { DataTableView } from "./../../common/DataTableView";
import AddTemplate from "./TemplateCreate";

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
      setTemplates(sortTemplates(templates));
    });
  }, []);

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
      label: "Dodaj szablon",
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
      actionEvent: onDelete,
    },
  ];
  const newTemplatePlaceholders = {
    name: "Nazwa szablonu",
    contractor: "Kontrahent",
    amount: "Kwota",
  };
  return (
    <React.Fragment>
      <AddTemplate
        editModeActive={editModeActive}
        setEditModeActive={setEditModeActive}
        selectedItem={templates.find(
          (template) => template.id === selectedTemplateId
        )}
        placeholders={newTemplatePlaceholders}
        itemType="template"
        refPath="templates"
        actions={actions}
      />
      <DataTableView
        headers={headers}
        data={templates}
        actions={tableActions}
      />
    </React.Fragment>
  );
}
