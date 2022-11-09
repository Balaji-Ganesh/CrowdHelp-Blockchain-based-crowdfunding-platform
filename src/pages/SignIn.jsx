import * as React from "react";
// UI imports..
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// service imports..
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { useEffect } from "react";
import axios from "axios";
import { LocalConvenienceStoreOutlined } from "@mui/icons-material";

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
  // local attributes..
  const [authState, setAuthState] = React.useState(
    false || window.localStorage.getItem("authStatus") === "true"
  );
  const [userToken, setUserToken] = React.useState("");
  // handle whenever refreshed..
  useEffect(() => {
    firebase.auth().onAuthStateChanged((userCredentials) => {
      if (userCredentials) {
        // if yes, keep logged in.
        setAuthState(true);
        window.localStorage.setItem("authStatus", "true"); // save in local storage.. can cut-off the delay
        // get userToken..
        userCredentials.getIdToken().then((userToken) => {
          setUserToken(userToken);
          // console.log(userToken);
        });
      }
    });
  }, []); // Don't worry..!! this takes few seconds to update.

  // helpers..
  const fetchData = async (token) => {
    const response = await axios.get("http://localhost:4000/api/data", {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    console.log(response.data);
  };

  const signInWithGooglePopup = () => {
    firebase
      .auth()
      .signInWithPopup(new firebase.auth.GoogleAuthProvider())
      .then((userCredentials) => {
        console.log(userCredentials);
      });
  };

  const signInWithEmailAndPassword = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    firebase
      .auth()
      .signInWithEmailAndPassword(data.get("email", data.get("password")))
      .then((userCredentials) => {
        console.log(userCredentials);
      });
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    fetchData(userToken);
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
            onSubmit={signInWithEmailAndPassword}
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
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
      {authState && <Typography>Signed In</Typography>}
    </ThemeProvider>
  );
}
