import * as React from "react";
// UI imports..
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  styled,
  Avatar,
  Button,
  Box,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import BadgeUnstyled from "@mui/base/BadgeUnstyled";
import NotificationsIcon from "@mui/icons-material/Notifications";

// service imports..
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Custom styling to components
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "40%",
}));

const UserActions = styled("div")(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "20px",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserProfile = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function NavBar() {
  // hooks ..
  const [profileMenuDisplayStatus, setProfileMenuDisplayStatus] =
    useState(false);
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");
  const navigate = useNavigate();

  const { currentUserCredentials, signout } = useAuth();

  const handleSignout = async () => {
    // set the response activations to default.
    setShowResponse(false);
    setResponseMsg("");
    setResponseSeverity("error"); // doesn't allowing to have empty, so kept this. Anyway, as showing is false, no worries.

    // do signout.
    try {
      await signout();
      navigate("/sign-in"); // navigate to sign-in page, after successful logout.
    } catch (error) {
      setShowResponse(true);
      setResponseMsg(error.message);
      setResponseSeverity("error");
    }
  };

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#EFEFEF" }}>
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "none",
              sm: "block",
              color: "#717171",
            },
          }}
        >
          CrowdHelp
        </Typography>
        <StorefrontIcon
          sx={{
            display: {
              xs: "block",
              sm: "none",
            },
          }}
        />
        {/* <SearchBar>
          <InputBase placeholder="Search.." />
        </SearchBar> */}
        {/* {isLoggedIn && ( */}

        <UserActions>
          <Box sx={{ m: 0 }}>
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2 }}
            >
              Create Campaign
            </Button>
          </Box>
          {currentUserCredentials.email ? (
            <>
              <Badge badgeContent={9} color="error">
                <EmailIcon />
              </Badge>
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
              <Avatar
                onClick={() => setProfileMenuDisplayStatus(true)}
                sx={{ width: 30, height: 30 }}
                alt="User"
                src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
              />
            </>
          ) : (
            <>
              <Button
                type="submit"
                // fullWidth
                variant="text"
                // sx={{ mt: 3, mb: 2 }}
                onClick={() => navigate("/sign-in")}
              >
                Sign In
              </Button>
            </>
          )}
        </UserActions>
        {/*  */}
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        // anchorEl={anchorEl}
        open={profileMenuDisplayStatus}
        onClose={(e) => setProfileMenuDisplayStatus(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem onClick={() => handleSignout()}>Sign out</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
