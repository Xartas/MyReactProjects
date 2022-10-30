import React, { useState, useEffect } from "react";
import {
  Radio,
  RadioGroup,
  Container,
  FormControl,
  FormLabel,
  FormControlLabel,
  Button,
} from "@mui/material";
import { collection, onSnapshot } from "firebase/firestore";
import { useFirebase } from "../contexts/FirebaseContext";
import Navbar from "../common/navbar/Navbar";
import ResultView from "../common/ResultView";
import QuizSheet from "../common/quiz/QuizSheet";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

export default function Quiz() {
  const [quizWordsLimit, setQuizWordsLimit] = useState(2);
  const [words, setWords] = useState([]);
  const [wordsSelectedToQuiz, setWordsSelectedToQuiz] = useState([]);
  const [quizActive, setQuizActive] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizSheetData, setQuizSheetData] = useState([]);
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

  const startQuiz = () => {
    let fullWordsList = words;
    let selectedWords = [];
    let wordsCount =
      fullWordsList.length < quizWordsLimit
        ? fullWordsList.length
        : quizWordsLimit;
    for (let i = 0; i < wordsCount; i++) {
      let randomWordPosition = Math.floor(Math.random() * fullWordsList.length);
      const randomWord = fullWordsList[randomWordPosition];
      selectedWords = selectedWords.concat(randomWord);
      fullWordsList = fullWordsList.filter((word) => word.id !== randomWord.id);
    }
    setWordsSelectedToQuiz(selectedWords);
    setQuizActive(true);
  };

  return (
    <>
      <Navbar />
      <Container>
        <FormControl sx={{ marginTop: "20px" }}>
          <FormLabel>Wybierz ile słów ma być na kartkówce:</FormLabel>
          <RadioGroup
            defaultValue={2}
            row
            onChange={(e) => setQuizWordsLimit(e.target.value)}
          >
            <FormControlLabel
              value={2}
              control={<Radio color="secondary" />}
              label="2"
            />
            <FormControlLabel
              value={5}
              control={<Radio color="secondary" />}
              label="5"
            />
            <FormControlLabel
              value={10}
              control={<Radio color="secondary" />}
              label="10"
            />
            <FormControlLabel
              value={20}
              control={<Radio color="secondary" />}
              label="20"
            />
          </RadioGroup>
          <FormControlLabel
            control={
              <Button
                variant="contained"
                onClick={() => startQuiz()}
                startIcon={<PlayArrowIcon />}
                color="secondary"
                disabled={quizActive}
                sx={{ marginLeft: "8px" }}
              >
                {"Rozpocznij quiz".toUpperCase()}
              </Button>
            }
          />
        </FormControl>
      </Container>
      {quizActive && (
        <QuizSheet
          wordsToQuiz={wordsSelectedToQuiz}
          setQuizActive={setQuizActive}
          setQuizFinished={setQuizFinished}
          setQuizSheetData={setQuizSheetData}
        />
      )}
      {!quizActive && quizFinished && (
        <ResultView quizSheetData={quizSheetData} />
      )}
    </>
  );
}
