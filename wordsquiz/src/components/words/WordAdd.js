import React, { useState } from "react";
import { Button, Container, TextField, Stack } from "@mui/material";
import { useFirebase } from "../contexts/FirebaseContext";
import { addDoc, collection } from "firebase/firestore";

export default function WordAdd() {
  const [englishWord, setEnglishWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [word, setWord] = useState("");
  const firebase = useFirebase();

  const addNewWord = () => {
    const wordsRef = collection(firebase.firestore, "words/");
    const newWord = {
      englishWord: englishWord,
      translate: translate,
    };
    setWord(newWord);
    addDoc(wordsRef, newWord);
  };

  return (
    <Container sx={{ marginTop: "20px" }}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="English word"
          variant="outlined"
          value={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
        />
        <TextField
          label="Translate"
          variant="outlined"
          value={translate}
          onChange={(e) => setTranslate(e.target.value)}
        />
        <Button variant="contained" onClick={() => addNewWord()}>
          Dodaj
        </Button>
      </Stack>
    </Container>
  );
}
