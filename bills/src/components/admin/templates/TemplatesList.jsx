import React, { useState, useEffect } from "react";
import "./billingTemplates.scss";
import { useFirebase } from "../../../contexts/FirebaseContext";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { templatesConstants } from "../../../utils/utils";
import DataTableView from "./../../common/DataTableView";
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
      setTemplates(templates.sort((a, b) => (a.name > b.name ? 1 : -1)));
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

  return (
    <React.Fragment>
      <AddTemplate
        editModeActive={editModeActive}
        setEditModeActive={setEditModeActive}
        selectedItem={templates.find(
          (template) => template.id === selectedTemplateId
        )}
        placeholders={templatesConstants.newTemplatePlaceholders}
        itemType="template"
        refPath="templates"
        actions={templatesConstants.actions}
      />
      <DataTableView
        headers={templatesConstants.tableHeaders}
        data={templates}
        actions={tableActions}
      />
    </React.Fragment>
  );
}
