import {
  Button,
  Container,
  TextField,
  Typography,
  styled,
  Avatar,
  Link,
  Box,
  Grid,
} from "@mui/material";
import React from "react";
// import LockIcon from "@mui/icons-material/Lock";

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledForm = styled("form")(({ theme }) => ({
  //   marginTop: "105px",
  width: "100%", // Fix IE 11 issue.
  marginTop: theme.spacing(3),
}));

const StyledDiv = styled("div")(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
}));

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="#">
        CrowdHelp
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

function SignUp() {
  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        width: "58%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "15px",
      }}
    >
      <StyledDiv>
        <StyledAvatar>{/* <LockIcon /> */}</StyledAvatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>

        <StyledForm noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
              />
            </Grid>
          </Grid>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          ></TextField>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Password"
            name="password"
            autoComplete="password"
          ></TextField>
          <StyledButton
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Sign Up
          </StyledButton>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="#" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
        </StyledForm>
        <Box mt={8}>
          <Copyright />
        </Box>
      </StyledDiv>
    </Container>
  );
}

export default SignUp;
