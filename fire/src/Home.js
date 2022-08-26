import { signOut } from "firebase/auth";
import React, { useState, useEffect } from "react";
import {
  getDocs,
  doc,
  setDoc,
  addDoc,
  collection,
  onSnapshot,
} from "firebase/firestore";

function Home({ user, auth, firestore }) {
  const [tel, setTel] = useState("");
  const [name, setName] = useState("");
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const usersRef = collection(firestore, "users");
    onSnapshot(usersRef, (snapshot) => {
      setUsers(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });
  }, []);

  const handleOnClick = () => {
    signOut(auth);
  };

  const save = () => {
    const usersRef = collection(firestore, "users");
    addDoc(usersRef, {
      name: name,
      tel: tel,
    });
  };

  return (
    <>
      <div>Zalogowany!</div>
      <span>Email: {user.email}</span>
      <input
        placeholder="Podaj tel"
        value={tel}
        onChange={(e) => setTel(e.target.value)}
      ></input>
      <input
        placeholder="Nazwa"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>
      <button onClick={save}>Zapisz dane</button>
      <span>Zapisany tel: ???</span>
      <button onClick={handleOnClick}>Wyloguj</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} {user.tel}
          </li>
        ))}
      </ul>
    </>
  );
}

export default Home;
