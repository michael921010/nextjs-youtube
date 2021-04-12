import { useCallback, useEffect, useRef, useState } from "react";
import { Search } from "@material-ui/icons";
import { InputBase } from "@material-ui/core";
import { makeStyles, withStyles, fade } from "@material-ui/core/styles";

const Input = withStyles((theme) => ({
  root: {
    color: "inherit",
    width: "100%",
  },
  input: {
    padding: theme.spacing(1, 2),
    // vertical padding + font size from searchIcon
    marginRight: `calc(1em + ${theme.spacing(3)}px)`,
    transition: theme.transitions.create("width"),

    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
      borderTopLeftRadius: theme.shape.borderRadius,
      borderBottomLeftRadius: theme.shape.borderRadius,
    },
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}))(InputBase);

const SearchIcon = withStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 1),
  },
}))(Search);

const useStyles = makeStyles((theme) => ({
  root: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  icon: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: fade(theme.palette.common.white, 0.25),
      borderTopRightRadius: theme.shape.borderRadius,
      borderBottomRightRadius: theme.shape.borderRadius,
    },
  },
  iconContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderLeft: `1px solid ${theme.palette.grey.A200}`,
  },
}));

export default function SearchBar({ placeholder, value, onChange, onSearch }) {
  const classes = useStyles();

  const handleChange = useCallback(
    (e) => {
      if (typeof onChange === "function") onChange(e);
    },
    [onChange]
  );

  const handleClick = useCallback(
    (e) => {
      e.preventDefault();
      if (typeof onSearch === "function") onSearch(e);
    },
    [onSearch]
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (e.keyCode === 13) {
        e.preventDefault();
        if (typeof onSearch === "function") onSearch(e);
      }
    },
    [onSearch]
  );

  return (
    <div className={classes.root}>
      <Input
        value={value}
        placeholder={placeholder}
        inputProps={{ "aria-label": "search" }}
        onKeyDown={handleKeyDown}
        onChange={handleChange}
      />
      <div className={classes.icon} onClick={handleClick}>
        <div className={classes.iconContent}>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
}

SearchBar.defaultProps = {
  placeholder: "Search...",
  onChange: () => {},
  onSearch: () => {},
};
