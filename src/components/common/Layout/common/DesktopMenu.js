import { useState, useCallback } from "react";
import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Box,
  Typography,
  ButtonBase,
} from "@material-ui/core";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import { Notifications, AccountCircle, Mail } from "@material-ui/icons";
import { useGoogleService } from "hooks";
import c from "classnames";

const Section = withStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}))(Box);

const useStyles = makeStyles((theme) => ({
  signIn: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    // border: `1px solid ${theme.palette.common.white}`,
    borderRadius: 4,
    padding: theme.spacing(0, 1.5),
    marginLeft: theme.spacing(1),
  },
}));

const menuId = "primary-search-account-menu";
export default function DesktopMenu() {
  const {
    isAuthorized,
    signOutAuth,
    signInAuth,
    requesting,
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
          className={c({ [classes.signIn]: !isAuthorized })}
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          color="inherit"
          disabled={!isAuthorized && requesting}
          onClick={isAuthorized ? handleMenuOpen : handleAuth(true)}
        >
          {!isAuthorized && (
            <Typography style={{ marginRight: 4 }}>Sign In</Typography>
          )}
          <AccountCircle />
        </IconButton>
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
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem disabled={requesting} onClick={handleAuth(false)}>
          Sign Out
        </MenuItem>
      </Menu>
    </>
  );
}
