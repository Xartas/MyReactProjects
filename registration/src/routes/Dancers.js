import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";

function Dancers() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dancers, setDancers] = useState([]);
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
          </li>
        ))}
      </ul>
    </>
  );
}

export default Dancers;
