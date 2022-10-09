import React, { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";

function CreditsList() {
  const [credits, setCredits] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const creditsRef = collection(
      firebase.firestore,
      "users/" + firebase.user.uid + "/credits"
    );
    onSnapshot(creditsRef, (snapshot) => {
      const creditsData = snapshot.docs.map((doc) => doc.data());
      setCredits(creditsData);
    });
  }, []);

  console.log(credits);
  return (
    <React.Fragment>
      <ul>
        {credits.map((credit) => (
          <li>{credit.title}</li>
        ))}
      </ul>
    </React.Fragment>
  );
}

export default CreditsList;
