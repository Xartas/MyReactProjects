import { addDoc, collection, onSnapshot } from "firebase/firestore";
import React, { useEffect } from "react";
import { useState } from "react";
import { useFirebase } from "../contexts/FirebaseContext";

function Presentations() {
  const [name, setName] = useState("");
  const [dancers, setDancers] = useState([]);
  const firebase = useFirebase();
  const [selectedDancers, setSelectedDancers] = useState({});

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

  const savePresentation = () => {
    const presentationRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/presentations"
    );
    addDoc(presentationRef, {
      name: name,
      dancers: dancers.filter((dancer) => selectedDancers[dancer.id]),
    });
  };

  const changeDancerSelection = (dancerId) => {
    const newSelectedDancers = { ...selectedDancers };
    newSelectedDancers[dancerId] = !newSelectedDancers[dancerId];
    setSelectedDancers(newSelectedDancers);
  };

  return (
    <>
      <input
        value={name}
        placeholder={"name"}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={savePresentation}>Zapisz</button>
      <ul>
        {dancers.map((dancer) => (
          <li key={dancer.id}>
            <input
              type="checkbox"
              defaultChecked={selectedDancers[dancer.id]}
              onChange={() => changeDancerSelection(dancer.id)}
            />
            {dancer.firstName} {dancer.lastName}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Presentations;
