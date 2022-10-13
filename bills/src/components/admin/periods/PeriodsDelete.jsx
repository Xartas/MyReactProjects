import { useFirebase } from "../../../contexts/FirebaseContext";
import { doc, deleteDoc } from "firebase/firestore";

export const deleteAll = (billingPeriods, activeYear) => {
  const firebase = useFirebase();
  billingPeriods.map((bp) => {
    if (bp.year === activeYear) {
      const bpDoc = doc(
        firebase.firestore,
        "users/" + firebase.user.uid + "/billingPeriods",
        bp.id
      );
      deleteDoc(bpDoc);
    }
  });
};
