import React, { useState, useEffect } from "react";
import { Grid, Container, Typography, Button } from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { useFirebase } from "../../contexts/FirebaseContext";
import CustomTextField from "../CustomTextField";

export default function QuizSheet({
  wordsToQuiz,
  setQuizActive,
  setQuizFinished,
  setQuizSheetData,
}) {
  const [quizSheet, setQuizSheet] = useState([]);
  const [answer, setAnswer] = useState(""); // ten stan wg mnie jest niepotrzebny - do potwierdzenia.
  const firebase = useFirebase();

  useEffect(() => {
    let allWords = [];
    wordsToQuiz.forEach(
      (word) => (allWords = allWords.concat({ ...word, answer: "" }))
    );
    setQuizSheet(allWords);
  }, [wordsToQuiz]);

  const onChangeAnswer = (event, word) => {
    setAnswer(event.target.value); // bez tej linijki wywala mi się appka - why? Nie można zmieniać danych w arkuszu.
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
    return result;
  };

  console.log("quizSheet");
  console.log(quizSheet);
  console.log(wordsToQuiz);
  return (
    <>
      <Container sx={{ marginTop: "20px" }}>
        <Grid container spacing={1}>
          {quizSheet.map((word) => (
            <Grid key={word.id} item xs={6}>
              <Grid container alignItems="center">
                <Grid key={word.id + "_en"} item xs={6}>
                  <Typography>{word.englishWord}</Typography>
                </Grid>
                <Grid key={word.id + "_pl"} item xs={6}>
                  <CustomTextField
                    label="answer"
                    variant="outlined"
                    required={true}
                    editedValue={word.answer}
                    onChange={(e) => onChangeAnswer(e, word)}
                  />
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
        <Button
          variant="contained"
          color="secondary"
          spacing={2}
          onClick={() => console.table(quizSheet)}
        >
          {"Pokaż arkusz".toUpperCase()}
        </Button>
      </Container>
    </>
  );
}
