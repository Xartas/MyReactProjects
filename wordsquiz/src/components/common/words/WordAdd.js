import React, { useState, useEffect } from "react";
import { Button, Container, Stack } from "@mui/material";
import { useFirebase } from "../../contexts/FirebaseContext";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import CustomTextField from "../CustomTextField";
import { Print } from "@mui/icons-material";

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
      englishWord: englishWord.toLowerCase(),
      translate: translate.toLowerCase(),
    };
    setWord(newWord);
    addDoc(wordsRef, newWord);
    setEnglishWord("");
    setTranslate("");
  };

  const updateWord = () => {
    const wordsRef = collection(firebase.firestore, "words/");
    const wordDoc = doc(wordsRef, word.id);
    updateDoc(wordDoc, {
      englishWord: englishWord.toLowerCase(),
      translate: translate.toLowerCase(),
    });
    setEnglishWord("");
    setTranslate("");
    setWord(undefined);
  };

  const onCancel = () => {
    setEnglishWord("");
    setTranslate("");
    setEditMode(!editMode);
  };

  return (
    <Container
      sx={{
        marginTop: "20px",
        "@media print ": { display: "none !important" },
      }}
    >
      <Stack direction="row" spacing={2}>
        <CustomTextField
          label="English word"
          variant="outlined"
          required={true}
          editedValue={englishWord}
          onChange={(e) => setEnglishWord(e.target.value)}
        />
        <CustomTextField
          label="Translate"
          variant="outlined"
          required={true}
          editedValue={translate}
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
          disabled={!editMode || (editMode && !word)}
        >
          Zapisz
        </Button>
        <Button
          variant="contained"
          onClick={() => onCancel()}
          disabled={!editMode}
        >
          Anuluj
        </Button>
        <Button onClick={() => window.print()}>
          <Print variant="contained" />
        </Button>
      </Stack>
    </Container>
  );
}
