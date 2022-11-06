import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Copyright from "./Copyright";

export default function Footer() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      <Container component="main" sx={{ mt: 8, mb: 2 }} maxWidth="sm">
        <Typography variant="h2" component="h1" gutterBottom>
          Crowd Help
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          {
            "Worrying of funds to fulfill a noble cause? You've came to right place."
          }
          {"Get help from the community...!!"}
        </Typography>
        <Typography variant="body1">
          Get funds for your cause with Blockchain security.
        </Typography>
      </Container>
      <Box
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: "auto",
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1">
            CrowdHelp platform - development in progress 🚧.
          </Typography>
          <Copyright />
        </Container>
      </Box>
    </Box>
  );
}
