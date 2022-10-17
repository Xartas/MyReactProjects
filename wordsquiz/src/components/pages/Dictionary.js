import React from "react";
import Navbar from "../navbar/Navbar";
import WordsList from "../words/WordsList";
import WordAdd from "./../words/WordAdd";

export default function Dictionary() {
  return (
    <>
      <Navbar />
      <WordAdd />
      <WordsList />
    </>
  );
}
