// import { Book, Pets } from "@mui/icons-material";
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  styled,
  Avatar,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import React from "react";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import BadgeUnstyled from "@mui/base/BadgeUnstyled";
import NotificationsIcon from "@mui/icons-material/Notifications";
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
  const [profileMenuDisplayStatus, setProfileMenuDisplayStatus] =
    useState(false);
  return (
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography
          variant="h6"
          sx={{
            display: {
              xs: "none",
              sm: "block",
            },
          }}
        >
          BookStore
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
        <UserActions>
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
        </UserActions>
        <UserProfile onClick={() => setProfileMenuDisplayStatus(true)}>
          <Avatar
            sx={{ width: 30, height: 30 }}
            alt="User"
            src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          />
          <Typography>John Doe</Typography>
        </UserProfile>
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
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
}

export default NavBar;
