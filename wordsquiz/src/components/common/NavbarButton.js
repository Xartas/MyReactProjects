import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Typography, Stack, Box, Container } from "@mui/material";

export default function NavbarButton({ label, icon, linkPath }) {
  return (
    <Link to={linkPath} style={{ textDecoration: "none" }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "80px",
          height: "80px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <IconButton size="large" color="primary">
          {icon}
        </IconButton>
        <Typography variant="button" color="primary" fontWeight="700">
          {label}
        </Typography>
      </Box>
    </Link>
  );
}
