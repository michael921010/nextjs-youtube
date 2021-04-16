import { useState, useCallback } from "react";
import { IconButton, Badge, MenuItem, Menu, Box } from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import {
  Notifications,
  AccountCircle,
  Mail,
  ExitToAppRounded,
} from "@material-ui/icons";
import { useGoogleService } from "hooks";
import { hasData } from "utils";
import SignInButton from "./SignInButton";

const Section = withStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}))(Box);

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
}));

const menuId = "primary-search-account-menu";
export default function DesktopMenu() {
  const {
    isAuthorized,
    signOutAuth,
    signInAuth,
    requesting,
    profile,
  } = useGoogleService();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const classes = useStyles();

  const handleMenuClose = useCallback((e) => {
    e.preventDefault();
    setAnchorEl(null);
  }, []);

  const handleMenuOpen = useCallback((e) => {
    e.preventDefault();
    setAnchorEl(e.currentTarget);
  }, []);

  const handleAuth = useCallback(
    (signIn) => (e) => {
      e.preventDefault();

      if (signIn) {
        signInAuth();
      } else {
        setAnchorEl(null);

        signOutAuth();
      }
    },
    []
  );

  return (
    <>
      <Section>
        {isAuthorized ? (
          <>
            <IconButton aria-label="show mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <Mail />
              </Badge>
            </IconButton>

            <IconButton aria-label="show notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              color="inherit"
              onClick={handleMenuOpen}
            >
              {hasData(profile?.avatar) ? (
                <img src={profile.avatar} className={classes.avatar} />
              ) : (
                <AccountCircle />
              )}
            </IconButton>
          </>
        ) : (
          <SignInButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
            disabled={requesting}
            onClick={handleAuth(true)}
          />
        )}
      </Section>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={menuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <IconButton
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem disabled={requesting} onClick={handleAuth(false)}>
          <IconButton
            aria-label="auth of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="inherit"
          >
            <ExitToAppRounded />
          </IconButton>
          <p>Sign Out</p>
        </MenuItem>
      </Menu>
    </>
  );
}
