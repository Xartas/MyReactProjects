import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, TextField, Button } from "@mui/material";
import { addDoc, collection, doc } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";

export default function QuizSheet({
  wordsToQuiz,
  setQuizActive,
  setQuizFinished,
  setQuizSheetData,
}) {
  const [quizSheet, setQuizSheet] = useState([]);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const firebase = useFirebase();

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

  const onEndQuiz = () => {
    const sheetsRef = collection(firebase.firestore, "sheets/");
    const result = calculateResult();
    let currentdate = new Date();
    let sysdate =
      currentdate.getDate() +
      "/" +
      (currentdate.getMonth() + 1) +
      "/" +
      currentdate.getFullYear() +
      " @ " +
      currentdate.getHours() +
      ":" +
      currentdate.getMinutes() +
      ":" +
      currentdate.getSeconds();
    let newSheetData = {
      date: sysdate,
      wordsCount: quizSheet.length,
      correctAnswers: result,
    };
    addDoc(sheetsRef, newSheetData).then((sheetPromise) => {
      let wordsRef = collection(
        firebase.firestore,
        "sheets/" + sheetPromise.id + "/words/"
      );
      quizSheet.map((word) => addDoc(wordsRef, word));
    });
    setQuizActive(false);
    setQuizFinished(true);
    setQuizSheetData(newSheetData);
  };

  const calculateResult = () => {
    let result = 0;
    quizSheet.forEach((word) => {
      if (word.translate === word.answer) {
        result++;
      }
    });
    setCorrectAnswers(result);
    return result;
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
          onClick={() => onEndQuiz()}
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
