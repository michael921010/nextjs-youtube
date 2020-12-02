import { useState, useCallback } from "react";
import { IconButton, Badge, MenuItem, Menu, Box } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { Notifications, AccountCircle, Mail } from "@material-ui/icons";

const Section = withStyles((theme) => ({
  root: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
}))(Box);

const menuId = "primary-search-account-menu";
export default function DesktopMenu() {
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

  return (
    <>
      <Section>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <Mail />
          </Badge>
        </IconButton>

        <IconButton aria-label="show 17 new notifications" color="inherit">
          <Badge badgeContent={17} color="secondary">
            <Notifications />
          </Badge>
        </IconButton>

        <IconButton
          edge="end"
          aria-label="account of current user"
          aria-controls={menuId}
          aria-haspopup="true"
          onClick={handleMenuOpen}
          color="inherit"
        >
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
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      </Menu>
    </>
  );
}
