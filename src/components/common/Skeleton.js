import { Skeleton } from "@material-ui/lab";
import { BlockRounded } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  error: {
    backgroundColor: theme.palette.error.main,
  },
  loading: {},
}));

const skeleton = Boolean(process.env.ENV === "test");

export default function MySkeleton({
  error,
  loading,
  className,
  children,
  ...props
}) {
  const classes = useStyles();

  if (skeleton) {
    return (
      <Skeleton
        className={c(classes.skeleton, classes.loading, className)}
        {...props}
      />
    );
  }

  if (error) {
    if (props.variant === "circle") {
      return (
        <BlockRounded className={classes.skeleton} color="error" {...props} />
      );
    }

    return (
      <Skeleton
        className={c(classes.skeleton, classes.error, className)}
        {...props}
      />
    );
  }

  if (loading) {
    return (
      <Skeleton
        className={c(classes.skeleton, classes.loading, className)}
        {...props}
      />
    );
  }

  return children;
}
