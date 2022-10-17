import React, { useState, useEffect } from "react";
import { Button, Container, TextField, Stack } from "@mui/material";
import { useFirebase } from "../contexts/FirebaseContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

export default function WordAdd({ editedWord, editMode, setEditMode }) {
  const [englishWord, setEnglishWord] = useState("");
  const [translate, setTranslate] = useState("");
  const [word, setWord] = useState("");
  const firebase = useFirebase();

  useEffect(() => {
    if (editedWord) {
      setEnglishWord(editedWord.englishWord);
      setTranslate(editedWord.translate);
      setWord(editedWord);
    }
  }, [editedWord]);

  const addNewWord = () => {
    const wordsRef = collection(firebase.firestore, "words/");
    const newWord = {
      englishWord: englishWord,
      translate: translate,
    };
    setWord(newWord);
    addDoc(wordsRef, newWord);
  };

  const updateWord = () => {
    const wordsRef = collection(firebase.firestore, "words/");
    const wordDoc = doc(wordsRef, word.id);
    updateDoc(wordDoc, {
      englishWord: englishWord,
      translate: translate,
    });
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
        <Button
          variant="contained"
          onClick={() => addNewWord()}
          disabled={editMode}
        >
          Dodaj
        </Button>
        <Button
          variant="contained"
          onClick={() => updateWord()}
          disabled={!editMode}
        >
          Zapisz
        </Button>
        <Button
          variant="contained"
          onClick={() => setEditMode(!editMode)}
          disabled={!editMode}
        >
          Anuluj
        </Button>
      </Stack>
    </Container>
  );
}
