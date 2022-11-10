import * as React from "react";
// UI imports..
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import NavBar from "../components/NavBar";

// service imports..
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        CrowdHelp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function Profile() {
  // context's..
  const { currentUserCredentials, updateEmail, updatePassword } = useAuth();
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");
  const [isLoading, setIsLoading] = React.useState(false); // to prevent multiple submits while processing..

  const [isUpdatingProfile, setIsUpdatingProfile] = React.useState(false);

  const navigate = useNavigate(); // for auto-navigation to home page.

  // helpers..
  const handleSubmit = (event) => {
    event.preventDefault();
    // Check: Is updating password..?
    if (isUpdatingProfile == false) {
      // if not .. enable updation..
      setIsUpdatingProfile(true);
      return;
    }

    // Start Perform updation.. -- ONLY when enabled..!!
    const data = new FormData(event.currentTarget);
    // perform client-side validations..
    if (data.get("password") != data.get("confirm-password")) {
      setShowResponse(true);
      setResponseSeverity("error");
      return setResponseMsg("Passwords do not match");
    }
    if (
      data.get("password") == "" &&
      (data.get("email") == currentUserCredentials.email ||
        data.get("email") == "")
    ) {
      setShowResponse(true);
      setResponseSeverity("error");
      return setResponseMsg("No fileds updated. Update cancelled.");
    }

    // after passing validations.. go for updation.
    const promises = [];
    // Take only what to update..
    if (data.get("email") != currentUserCredentials.email) {
      // if e-mail has changed..
      promises.push(updateEmail(data.get("email")));
    }
    if (data.get("password")) {
      // if password has changed..
      promises.push(updatePassword(data.get("password")));
    }

    // Run the promises..
    setIsLoading(true);
    Promise.all(promises)
      .then(() => {
        setShowResponse(true);
        setResponseSeverity("success");
        setResponseMsg("Profile updated successfully..!");
        navigate("/profile"); // navigate to profile page.
      })
      .catch((error) => {
        setShowResponse(true);
        setResponseSeverity("error");
        setResponseMsg(error.message);
      })
      .finally(() => {
        setIsLoading(false);
        /// looks like theres is 🐛 bug here. (Not perfectly sure). look in next iteration,
        // Showing incorrect response..
        setShowResponse(true);
        setResponseSeverity("success");
        setResponseMsg("Profile updated successfullye");
      });

    setIsLoading(false);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setShowResponse(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <NavBar />
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          {isUpdatingProfile ? (
            <>
              <Typography component="h1" variant="h5">
                Update Profile
              </Typography>
              <Typography variant="p" align="center">
                Enter only required fields to update. Leave blank to keep keep
                as it is.
              </Typography>
            </>
          ) : (
            <Typography component="h1" variant="h5">
              Profile
            </Typography>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {isUpdatingProfile ? (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    defaultValue={currentUserCredentials.email}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="confirm-password"
                    label="Confirm Password"
                    type="password"
                    id="password"
                    autoComplete="new-password"
                  />
                </Grid>
              </Grid>
            ) : (
              <TextField
                fullWidth
                label="Email Address"
                value={currentUserCredentials.email}
                disabled={true}
              />
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0.5 }}
            >
              Update Profile
            </Button>
            {isUpdatingProfile ? (
              <Link href="/profile" variant="body2">
                {"Cancel"}
              </Link>
            ) : (
              <Link href="/" variant="body2">
                {"Back to Home"}
              </Link>
            )}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <Snackbar
          open={showResponse}
          autoHideDuration={4000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        >
          <Alert onClose={handleClose} severity={responseSeverity}>
            {responseMsg}
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}
