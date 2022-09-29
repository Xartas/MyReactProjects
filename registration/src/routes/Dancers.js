import {
  addDoc,
  collection,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
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
  const [filterValue, setFilterValue] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [listItemsVisibleLimit, setListItemsVisibleLimit] = useState(10);

  const firebase = useFirebase();

  const dancersRef = collection(
    firebase.firestore,
    "users/" + firebase.user.uid + "/dancers"
  );

  useEffect(() => {
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

  useEffect(() => {
    if (filterValue !== "") {
      const q = query(dancersRef, where("lastName", "==", filterValue));
      onSnapshot(q, (snapshot) => {
        setDancers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    } else {
      onSnapshot(dancersRef, (snapshot) => {
        setDancers(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );
      });
    }
    // eslint-disable-next-line
  }, [filterValue]);

  const addDancer = () => {
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

  const sortList = (valueType) => {
    const q = query(
      dancersRef,
      orderBy(valueType === "firstName" ? "firstName" : "lastName"),
      limit(listItemsVisibleLimit)
    );
    onSnapshot(q, (snapshot) => {
      setDancers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  };

  console.log(listItemsVisibleLimit);

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

      <div style={{ marginTop: "10px", marginBottom: "10px" }}>
        <span>Filtruj wyniki na liście :</span>
        <input
          style={{ marginLeft: "10px" }}
          value={filterValue}
          onChange={(e) => setFilterValue(e.target.value)}
        ></input>
      </div>

      <div>
        <button onClick={() => sortList("firstName")}>Sortuj po imieniu</button>
        <button
          style={{ marginLeft: "10px" }}
          onClick={() => sortList("lastName")}
        >
          Sortuj po nazwisku
        </button>
      </div>

      {dancers.length > listItemsVisibleLimit && (
        <div style={{ marginTop: "10px", marginLeft: "70px" }}>
          <button style={{ color: "white", backgroundColor: "green" }}>
            Previous
          </button>
          <button
            style={{
              marginLeft: "10px",
              color: "white",
              backgroundColor: "green",
            }}
          >
            Next
          </button>
        </div>
      )}

      <ul>
        {dancers.map((dancer) => (
          <li style={{ lineHeight: "2" }} key={dancer.id}>
            {dancer.firstName} {dancer.lastName}
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => editDancer(dancer.id)}
            >
              Edytuj
            </button>
            <button
              style={{ marginLeft: "10px" }}
              onClick={() => deleteDancer(dancer.id)}
            >
              Usuń
            </button>
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
