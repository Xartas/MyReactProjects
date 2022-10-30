import React from "react";
import { Stack, Container, Typography } from "@mui/material";

export default function ResultView({ quizSheetData }) {
  return (
    <Container>
      <Stack direction="column" spacing={1} sx={{ alignItems: "center" }}>
        <Typography
          variant="h2"
          gutterBottom={true}
          sx={{ marginTop: "20px" }}
          color="primary"
        >
          GRATULACJE!
        </Typography>
        <Typography variant="h3" color="primary">
          Odpowiedziałeś poprawnie na {quizSheetData.correctAnswers} z{" "}
          {quizSheetData.wordsCount} słów!
        </Typography>
      </Stack>
    </Container>
  );
}
