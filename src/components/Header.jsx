import * as React from "react";
import { styled, alpha, createTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { ThemeProvider } from "@emotion/react";
import { Alert, Button, Snackbar } from "@mui/material";
import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import HeaderButton from "./HeaderButton";
import { useAtom } from "jotai";
import { headerButtonAtom, signedInAtom } from "../atom";
import { getAllMessagesDb } from "repo/messagesRepo";
import { Store } from "@tauri-apps/plugin-store";

const store = new Store("store.bin");

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [buttonSelected, setButtonSelected] = useAtom(headerButtonAtom);
  const [signedIn, setSignedIn] = useAtom(signedInAtom);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [messages, setMessages] = React.useState([]);
  const [error, setError] = React.useState(null);

  const [notification, setNotification] = React.useState({
    message: "",
    type: "success",
  });
  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const fetchMessages = async () => {
    try {
      const result = await getAllMessagesDb();
      console.log("MESSAGES ", result);
      setMessages(result);
    } catch (err) {}
  };

  React.useEffect(() => {
    fetchMessages();

    const intervalId = setInterval(fetchMessages, 10000);

    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const getSession = async () => {
      const val = await store.get("session");
      if (val) {
        setSignedIn(true);
        console.log("User is signed in:", val);
      } else {
        console.log("User is not signed in.");
      }
      console.log("SIGNED IN, ", signedIn);
    };
    getSession();
  }, [buttonSelected]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMessagesClick = async () => {
    const val = await store.get("session");
    console.log("SESSION HERE IN HEADER ", val);

    if (val) {
      setButtonSelected("inbox");
    } else {
      setNotification({
        message: `Must be signed in as Warden to access messages`,
        type: "error",
      });
      setOpen(true);
    }
  };
  const handleSignInClick = async () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    if (signedIn) {
      await store.clear();
      setSignedIn(false);
      // setNotification({
      //   message: `Signed out from Warden`,
      //   type: "success",
      // });
      // setOpen(true);
      setButtonSelected("signedout");
      console.log(store.get("session"));
    } else {
      setButtonSelected("signin");
    }
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#F37D3D",
      },
    },
  });

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleSignInClick}>
        {signedIn ? "Sign out" : "Sign in as Warden"}
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMessagesClick}>
        <IconButton size='large' color='inherit'>
          <Badge
            badgeContent={messages.length} //////////////////////////////////////////
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "purple",
                color: "white",
              },
            }}
          >
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>

      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          // @ts-ignore
          severity={notification?.type}
          sx={{ width: "100%" }}
        >
          {notification.message}
        </Alert>
      </Snackbar>

      <ThemeProvider theme={theme}>
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position='static'>
            <Toolbar>
              <Typography
                variant='h6'
                noWrap
                component='div'
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                <span style={{ fontFamily: "BungeeTint" }}>
                  {" "}
                  Confinement Corp
                </span>
              </Typography>
              {/*  */}
              <Box sx={{ flexGrow: 1 }} />
              <HeaderButton buttonLabel={"cells"} />
              <span className='p-1' />
              <HeaderButton buttonLabel={"prisoners"} />
              <span className='p-1' />
              <HeaderButton buttonLabel={"cameras"} />

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                <IconButton
                  size='large'
                  color='inherit'
                  onClick={handleMessagesClick}
                >
                  <Badge
                    badgeContent={messages.length} ////////////////////////////////
                    sx={{
                      "& .MuiBadge-badge": {
                        backgroundColor: "purple",
                        color: "white",
                      },
                    }}
                  >
                    <MailIcon />
                  </Badge>
                </IconButton>

                <IconButton
                  size='large'
                  edge='end'
                  aria-label='account of current user'
                  aria-controls={menuId}
                  aria-haspopup='true'
                  onClick={handleProfileMenuOpen}
                  color='inherit'
                >
                  <AccountCircle />
                </IconButton>
              </Box>
              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size='large'
                  aria-label='show more'
                  aria-controls={mobileMenuId}
                  aria-haspopup='true'
                  onClick={handleMobileMenuOpen}
                  color='inherit'
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </ThemeProvider>
    </>
  );
}
