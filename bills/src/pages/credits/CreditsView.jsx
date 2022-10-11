import React, { useState, useEffect } from "react";
import { collection, deleteDoc, doc, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import "./Credits.scss";
import CreditsList from "./CreditsList";
import CreditDetails from "./CreditDetails";
import InstallmentsList from "./InstallmentsList";
import AddCredit from "./CreditCreate";

export default function Credits() {
  const [credits, setCredits] = useState([]);
  const [selectedCreditId, setSelectedCreditId] = useState("");
  const [selectedCredit, setSelectedCredit] = useState({});
  const [editModeActive, setEditModeActive] = useState(false);
  const firebase = useFirebase();

  useEffect(() => {
    const creditsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits"
    );
    onSnapshot(creditsRef, (snapshot) => {
      const creditsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCredits(creditsData);
    });
  }, []);

  useEffect(() => {
    const credit = credits.find((credit) => credit.id === selectedCreditId);
    setSelectedCredit(credit);
  }, [selectedCreditId]);

  const onDelete = (creditId) => {
    const creditDoc = doc(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits/" + creditId
    );
    deleteDoc(creditDoc);
  };

  return (
    <React.Fragment>
      <div className="container">
        <AddCredit
          editModeActive={editModeActive}
          selectedCredit={selectedCredit}
          setEditModeActive={setEditModeActive}
        />
        <div className="creditContainer">
          <CreditsList
            credits={credits}
            setSelectedCredit={setSelectedCredit}
            setSelectedCreditId={setSelectedCreditId}
            onDelete={onDelete}
            editModeActive={editModeActive}
            setEditModeActive={setEditModeActive}
          />
          <CreditDetails credit={selectedCredit} />
        </div>
        {selectedCredit && (
          <div className="installmentsContainer">
            <InstallmentsList credit={selectedCredit} />
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
