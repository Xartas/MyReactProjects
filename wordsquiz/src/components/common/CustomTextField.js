import { TextField } from "@mui/material";
import React, { useState, useEffect } from "react";

export default function CustomTextField({
  variant,
  label,
  required,
  editedValue,
  onChange,
}) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [helperText, setHelperText] = useState("");

  useEffect(() => {
    if (editedValue !== undefined) setValue(editedValue);
  }, [editedValue]);

  useEffect(() => {
    const regex = /^[a-zA-Z]+$/;
    const isCorrect = regex.test(value);
    if (isCorrect || value === "") {
      setError(undefined);
      setHelperText("");
    } else {
      setError(true);
      setHelperText("Wprowadzono niepoprawną wartość.");
    }
  }, [value]);

  return (
    <TextField
      variant={variant}
      required={required}
      label={label}
      value={value}
      error={error}
      helperText={helperText}
      onChange={onChange}
    />
  );
}
