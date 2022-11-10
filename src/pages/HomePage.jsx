import React from "react";

// custom imports

import { Stack } from "@mui/system";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <Box className="App">
      <NavBar />
      {/* <Stack direction="row" spacing={2}></Stack> */}
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          🧑‍🤝‍🧑 Crowd Help :💰
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {"Get Help from Crowd..!!"}
          {" Raise a campaign to help the needy."}
        </Typography>
        <Typography variant="body1">Welcome 👋 to the community.</Typography>
        <Typography variant="body1">Development in progress 🚧.</Typography>
      </Container>
      <Footer />
    </Box>
  );
}

export default HomePage;
