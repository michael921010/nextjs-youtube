import React, { useState, useCallback, useEffect, useContext } from "react";
import { Link } from "@next";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Menu } from "@material-ui/icons";
import { useRouter } from "next/router";
import { SearchBar, useLayout, useMedia } from "components/common";
import { siteTitle } from "configs";
import { useGoogleService } from "hooks";
import { DesktopMenu, MobileMenu } from "./common";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  root: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  content: {
    marginTop: theme.spacing(8),
    backgroundColor: theme.palette.background.system,
  },
}));

export default function MyAppBar({ children }) {
  const router = useRouter();
  const classes = useStyles();
  const { isMdDown } = useMedia();
  const { authChecked } = useGoogleService();
  const { handleDrawer } = useLayout();

  const [searchQuery, setSearchQuery] = useState("");

  const handleMenu = useCallback(() => {
    handleDrawer(isMdDown ? "mobileOpen" : "desktopOpen");
  }, [isMdDown, handleDrawer]);

  const handleSearch = useCallback(() => {
    if (searchQuery.trim() !== "") {
      router.push({
        pathname: "/results",
        query: { search_query: searchQuery },
      });
    }
  }, [searchQuery]);

  useEffect(() => {
    handleDrawer("mobileOpen", false);
  }, [isMdDown]);

  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.root}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            onClick={handleMenu}
          >
            <Menu />
          </IconButton>
          <Link href="/">
            <Typography className={classes.title} variant="h6" noWrap>
              {siteTitle}
            </Typography>
          </Link>
          <SearchBar
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onSearch={handleSearch}
          />

          <div className={classes.grow} />
          {authChecked && (isMdDown ? <MobileMenu /> : <DesktopMenu />)}
        </Toolbar>
      </AppBar>

      <div className={classes.content}>{children}</div>
    </div>
  );
}
