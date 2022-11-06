import React from "react";

// custom imports

import { Stack } from "@mui/system";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

function HomePage() {
  return (
    <Box className="App">
      <NavBar />
      <Stack direction="row" spacing={2}></Stack>
      <Footer />
    </Box>
  );
}

export default HomePage;
