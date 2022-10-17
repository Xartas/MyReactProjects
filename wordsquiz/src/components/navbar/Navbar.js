import React from "react";
import Header from "./../common/header/Header";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Container, Tab, Tabs, Toolbar } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  return (
    <>
      <Header />
      <Container>
        <Toolbar />
        <Tabs
          value={location.pathname}
          textColor="secondary"
          indicatorColor="secondary"
          sx={{ paddingBottom: "20px", borderBottom: "1px solid #795548" }}
        >
          <Tab
            icon={<AbcOutlinedIcon fontSize="large" />}
            label={"Quiz"}
            value="/"
            selected={true}
            component={Link}
            to="/"
          ></Tab>
          <Tab
            icon={<MenuBookOutlinedIcon fontSize="large" />}
            label={"Słownik"}
            value="/dictionary"
            component={Link}
            to="/dictionary"
          ></Tab>
        </Tabs>
      </Container>
    </>
  );
}
