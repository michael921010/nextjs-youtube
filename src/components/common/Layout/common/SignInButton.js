import { useCallback } from "react";
import { IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { AccountCircle } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  signIn: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 4,
  },
}));

export default function SignInButton({ onClick, ...props }) {
  const classes = useStyles();

  const handleClick = useCallback(
    (e) => {
      if (typeof onClick === "function") onClick(e);
    },
    [onClick]
  );
  return (
    <IconButton {...props} className={classes.signIn} onClick={handleClick}>
      <Typography style={{ marginRight: 4 }}>Sign In</Typography>
      <AccountCircle />
    </IconButton>
  );
}
