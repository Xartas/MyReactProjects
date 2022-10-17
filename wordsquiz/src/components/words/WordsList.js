import React, { useState, useEffect } from "react";
import { Stack, Typography } from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";
import { Container } from "@mui/system";

export default function WordsList() {
  const [words, setWords] = useState([]);
  const firebase = useFirebase();

  useEffect(() => {
    const wordsRef = collection(firebase.firestore, "words/");
    onSnapshot(wordsRef, (snapshot) => {
      const words = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setWords(words);
    });
  }, []);

  return (
    <>
      <Container>
        <Stack direction="row" spacing={2}>
          {words.map((word) => {
            return (
              <Typography>
                {word.englishWord} - {word.translate}
              </Typography>
            );
          })}
        </Stack>
      </Container>
    </>
  );
}
