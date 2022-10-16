import React from "react";
import Header from "./../common/header/Header";
import NavbarButton from "../common/NavbarButton";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Box, Stack } from "@mui/system";
import { Toolbar } from "@mui/material";

export default function Navbar() {
  return (
    <Box>
      <Header />
      <Toolbar />
      <Stack
        maxHeight=""
        direction="row"
        alignItems="center"
        spacing={2}
        paddingBottom={2}
        color="secondary"
        sx={{ borderBottom: "1px solid" }}
      >
        <NavbarButton
          label={"Quiz"}
          icon={<AbcOutlinedIcon fontSize="large" />}
          linkPath="/"
        />
        <NavbarButton
          label={"Słownik"}
          icon={<MenuBookOutlinedIcon fontSize="inherit" />}
          linkPath="/dictionary"
        />
      </Stack>
    </Box>
  );
}
