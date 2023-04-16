import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./LandingPage.css";

// CUSTOM COMPONENTS
import RegisterForm from "../RegisterPage/RegisterForm";
import { Stack, Box, Button, Paper, Typography } from "@mui/material";

function LandingPage() {
  const history = useHistory();

  const onLogin = (event) => {
    history.push("/login");
  };

  return (
    <Stack
      spacing={3}
      sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh" }}
    >
      <Paper
        sx={{
          p: 3,
          marginTop: "80px",
          maxWidth: "300px",
          width: "90%",
          backgroundColor: "#F3ECE7",
        }}
        elevation={3}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            onClick={onLogin}
            sx={{
              color: "#F3ECE7",
              backgroundColor: "#B5B292",
              "&:hover": {
                backgroundColor: "#B5B292",
                transform: "scale(1.03)",
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Paper>
    </Stack>
  );
}

export default LandingPage;
