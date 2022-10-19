import React from "react";
import Header from "../header/Header";
import AbcOutlinedIcon from "@mui/icons-material/AbcOutlined";
import MenuBookOutlinedIcon from "@mui/icons-material/MenuBookOutlined";
import { Container, Divider, Tab, Tabs, Toolbar } from "@mui/material";
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
          sx={{ paddingBottom: "20px" }}
        >
          <Tab
            icon={<MenuBookOutlinedIcon fontSize="large" />}
            label={"Słownik"}
            value="/dictionary"
            component={Link}
            to="/dictionary"
          ></Tab>
          <Tab
            icon={<AbcOutlinedIcon fontSize="large" />}
            label={"Quiz"}
            value="/"
            selected={true}
            component={Link}
            to="/"
          ></Tab>
        </Tabs>
        <Divider />
      </Container>
    </>
  );
}
