import React, { useState, useEffect } from "react";
import {
  Button,
  FormControlLabel,
  Grid,
  Container,
  Switch,
  Typography,
} from "@mui/material";
import { useFirebase } from "../../contexts/FirebaseContext";
import { collection, onSnapshot } from "firebase/firestore";
import EditIcon from "@mui/icons-material/Edit";
import WordAdd from "./WordAdd";

export default function WordsList() {
  const [words, setWords] = useState([]);
  const [editMode, setEditMode] = useState(true);
  const [word, setWord] = useState();
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
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Container sx={{ marginTop: "20px" }}>
        <WordAdd
          editedWord={word}
          editMode={editMode}
          setEditMode={setEditMode}
        />
        <FormControlLabel
          control={
            <Switch
              checked={editMode}
              onChange={() => setEditMode(!editMode)}
              color="secondary"
            />
          }
          label="Edit mode on/off"
          sx={{ "@media print": { display: "none !important" } }}
        />
        <Grid container spacing={1}>
          {words.map((word) => (
            <Grid key={word.id} item xs={6}>
              <Grid container alignItems="center">
                <Grid key={word.id + "_en"} item xs={!editMode ? 6 : 5}>
                  <Typography>{word.englishWord}</Typography>
                </Grid>
                <Grid key={word.id + "_pl"} item xs={!editMode ? 6 : 5}>
                  <Typography>{word.translate}</Typography>
                </Grid>
                {editMode && (
                  <Button
                    variant="contained"
                    xs={2}
                    onClick={() => setWord(word)}
                    sx={{ "@media print": { display: "none !important" } }}
                  >
                    <EditIcon fontSize="small" />
                  </Button>
                )}
              </Grid>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
