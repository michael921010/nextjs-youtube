import { useState, useCallback } from "react";
import {
  IconButton,
  Badge,
  MenuItem,
  Menu,
  Box,
  Typography,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import {
  Mail,
  Notifications,
  MoreVert,
  AccountCircle,
} from "@material-ui/icons";
import { useGoogleService } from "hooks";

const Section = withStyles((theme) => ({
  root: {
    display: "flex",
    [theme.breakpoints.up("lg")]: {
      display: "none",
    },
  },
}))(Box);

const mobileMenuId = "primary-search-account-menu-mobile";
export default function MobileMenu() {
  const {
    isAuthorized,
    signInAuth,
    signOutAuth,
    requesting,
  } = useGoogleService();
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

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
      e.stopPropagation();
      setAnchorEl(null);

      if (signIn) {
        signInAuth();
      } else {
        signOutAuth();
      }
    },
    []
  );

  return (
    <>
      <Section>
        <IconButton
          aria-label="show more"
          aria-controls={mobileMenuId}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
          <MoreVert />
        </IconButton>
      </Section>
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem>
          <IconButton aria-label="show mails" color="inherit">
            <Badge badgeContent={4} color="secondary">
              <Mail />
            </Badge>
          </IconButton>
          <p>Messages</p>
        </MenuItem>
        <MenuItem>
          <IconButton aria-label="show notifications" color="inherit">
            <Badge badgeContent={11} color="secondary">
              <Notifications />
            </Badge>
          </IconButton>
          <p>Notifications</p>
        </MenuItem>
        <MenuItem>
          <IconButton
            aria-label="account of current user"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem>
        <MenuItem onClick={handleAuth(!isAuthorized)} disabled={requesting}>
          <IconButton
            aria-label="auth of current user"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Typography>{isAuthorized ? "Sign Out" : "Sign In"}</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
