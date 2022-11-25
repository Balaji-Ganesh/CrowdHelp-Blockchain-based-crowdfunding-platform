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
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import { LoadingButton } from "@mui/lab";

// service imports..
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Wallet connection..
import { useWallet } from "use-wallet";

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

  const wallet = useWallet();

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
              startIcon={<CreateIcon />}
              onClick={() => navigate("/create-campaign")}
            >
              Create Campaign
            </Button>
          </Box>
          {wallet.status === "connected" ? (
            <>
              <Button
                variant="text"
                endIcon={<ExpandMoreIcon />}
                onClick={() => setProfileMenuDisplayStatus(true)}
                color="primary"
              >
                {wallet.account.substr(0, 10) + "..."}
              </Button>
            </>
          ) : (
            <>
              <LoadingButton
                variant="text"
                loading={wallet.status === "connecting"}
                loadingIndicator="Connecting..."
                // sx={{ mt: 3, mb: 2 }}
                endIcon={<AccountBalanceWalletIcon />}
                onClick={() => wallet.connect()}
              >
                Connect Wallet
              </LoadingButton>
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
        <MenuItem onClick={() => wallet.reset()}>
          <ListItemIcon>
            <AccountBalanceWalletIcon fontSize="small" />
          </ListItemIcon>
          Disconnect Wallet
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
