import React, { useContext } from "react";
import { ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { RemoveCircleOutlineRounded as DefaultIcon } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import { LayoutContext } from "components/common";

const useStyle = makeStyles((theme) => ({
  item: ({ temporary, desktopOpen }) => ({
    flexDirection: !desktopOpen && !temporary && "column",

    [theme.breakpoints.only("sm")]: {
      flexDirection: !temporary && "column",
    },
    [theme.breakpoints.only("md")]: {
      flexDirection: !temporary && "column",
    },
  }),
  icon: ({ temporary, desktopOpen }) => ({
    minWidth: !desktopOpen && !temporary && "auto",

    [theme.breakpoints.only("sm")]: {
      minWidth: !temporary && "auto",
    },
    [theme.breakpoints.only("md")]: {
      minWidth: !temporary && "auto",
    },
  }),
  text: ({ temporary, desktopOpen }) => ({
    fontSize: !desktopOpen && !temporary && theme.fonts.xs,

    [theme.breakpoints.only("sm")]: {
      fontSize: !temporary && theme.fonts.xs,
    },
    [theme.breakpoints.only("md")]: {
      fontSize: !temporary && theme.fonts.xs,
    },
  }),
}));

export default function Button({ text, temporary, Icon = DefaultIcon }) {
  const { desktopOpen } = useContext(LayoutContext);
  const classes = useStyle({ temporary, desktopOpen });
  return (
    <ListItem button className={classes.item}>
      <ListItemIcon className={classes.icon}>
        <Icon />
      </ListItemIcon>
      <ListItemText primary={text} classes={{ primary: classes.text }} />
    </ListItem>
  );
}
