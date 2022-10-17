import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, TextField, Button } from "@mui/material";

export default function QuizSheet({ wordsToQuiz, setQuizActive }) {
  const [quizSheet, setQuizSheet] = useState([]);

  useEffect(() => {
    let allWords = [];
    wordsToQuiz.forEach(
      (word) => (allWords = allWords.concat({ ...word, answer: "" }))
    );
    setQuizSheet(allWords);
  }, [wordsToQuiz]);

  const onChangeAnswer = (event, word) => {
    let wordWithAnswer = {
      ...word,
      answer: event.target.value,
    };
    let allWords = quizSheet;
    allWords[allWords.findIndex((word) => wordWithAnswer.id === word.id)] = {
      ...wordWithAnswer,
    };
    setQuizSheet(allWords);
  };

  return (
    <>
      <Container sx={{ marginTop: "20px" }}>
        <Grid container spacing={1}>
          {wordsToQuiz.map((word) => (
            <Grid key={word.id} item xs={6}>
              <Grid container alignItems="center">
                <Grid key={word.id + "_en"} item xs={6}>
                  <Typography>{word.englishWord}</Typography>
                </Grid>
                <Grid key={word.id + "_pl"} item xs={6}>
                  <TextField
                    variant="outlined"
                    onChange={(e) => onChangeAnswer(e, word)}
                  ></TextField>
                </Grid>
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Button
          variant="contained"
          color="secondary"
          spacing={2}
          onClick={() => setQuizActive(false)}
        >
          {"Zakończ quiz".toUpperCase()}
        </Button>
        {/* <Button
          variant="contained"
          color="secondary"
          spacing={2}
          onClick={() => console.table(quizSheet)}
        >
          {"Pokaż arkusz".toUpperCase()}
        </Button> */}
      </Container>
    </>
  );
}
