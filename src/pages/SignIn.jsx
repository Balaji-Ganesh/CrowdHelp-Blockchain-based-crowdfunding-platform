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

export default function SignIn() {
  // context's..
  const { signInWithEmailAndPassword, signInWithGooglePopup } = useAuth();
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");
  const [isLoading, setIsLoading] = React.useState(false); // to prevent multiple submits while processing..

  const navigate = useNavigate(); // for auto-navigation to home page.

  // helpers..
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

    // do signin..
    // perform client-side validations..
    if (data.get("email") == "" || data.get("password") == "") {
      setShowResponse(true);
      setResponseSeverity("error");
      return setResponseMsg("Fields cannot be empty"); // exit from function..--- 👁️‍🗨️ on this...
    }
    try {
      // set the messages to default..
      setShowResponse(false);
      setResponseMsg("");
      setIsLoading(true);
      await signInWithEmailAndPassword(data.get("email"), data.get("password"));
      // console.log(data);
      setShowResponse(true);
      setResponseMsg("Sign in success.");
      setResponseSeverity("success");
      // console.log("Sign up success " + showResponse);
      navigate("/"); // auto-navigate to homepage (After successful sign-in)
    } catch (error) {
      setShowResponse(true);
      setResponseSeverity("error");
      setResponseMsg(error.message);
      console.log(error);
    } // after done with sign-in.
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
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 0.5 }}
            >
              Sign In
            </Button>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={signInWithGooglePopup}
              sx={{ mt: 0.5, mb: 2 }}
            >
              Sign In with Google
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/sign-up" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
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
