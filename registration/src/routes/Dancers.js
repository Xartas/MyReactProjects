import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";

function Dancers() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [editedFirstName, setEditedFirstName] = useState("");
  const [editedLastName, setEditedLastName] = useState("");
  const [dancers, setDancers] = useState([]);
  const [isEditDancerMode, setEditDancerMode] = useState(false);
  const [editedDancerId, setEditDancerId] = useState("");
  const firebase = useFirebase();

  useEffect(() => {
    const dancersRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/dancers"
    );
    onSnapshot(dancersRef, (snapshot) => {
      setDancers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
    // eslint-disable-next-line
  }, []);

  const addDancer = () => {
    const dancersRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/dancers"
    );
    addDoc(dancersRef, {
      firstName: firstName,
      lastName: lastName,
    });
  };

  const editDancer = (id) => {
    setEditDancerMode(true);
    setEditDancerId(id);
  };

  const updateDancer = (id) => {
    const dancerDoc = doc(
      firebase.firestore,
      "users/" + firebase.user.uid + "/dancers",
      id
    );
    updateDoc(dancerDoc, {
      firstName: editedFirstName,
      lastName: editedLastName,
    });
    setEditDancerMode(false);
  };

  const deleteDancer = (id) => {
    const dancerDoc = doc(
      firebase.firestore,
      "users/" + firebase.user.uid + "/dancers",
      id
    );
    deleteDoc(dancerDoc);
  };

  return (
    <>
      <input
        placeholder="firstName"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      ></input>
      <input
        placeholder="lastName"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      ></input>
      <button onClick={addDancer}>Dodaj</button>
      <ul>
        {dancers.map((dancer) => (
          <li key={dancer.id}>
            {dancer.firstName} {dancer.lastName}
            <button onClick={() => editDancer(dancer.id)}>Edytuj</button>
            <button onClick={() => deleteDancer(dancer.id)}>Usuń</button>
            {isEditDancerMode && editedDancerId === dancer.id && (
              <div>
                <input
                  defaultValue={dancer.firstName}
                  onChange={(e) => setEditedFirstName(e.target.value)}
                ></input>
                <input
                  defaultValue={dancer.lastName}
                  onChange={(e) => setEditedLastName(e.target.value)}
                ></input>
                <button onClick={() => updateDancer(dancer.id)}>
                  Zapisz zmianę
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dancers;
