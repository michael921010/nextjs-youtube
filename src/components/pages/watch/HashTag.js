import { Link } from "@next";
import { makeStyles } from "@material-ui/core/styles";
import c from "classnames";

const useStyles = makeStyles((theme) => ({
  text: {
    minHeight: theme.spacing(2),
    whiteSpace: "pre-wrap",
    color: theme.palette.link.main,
    fontSize: 13,
  },
}));

export default function HashTag({ hash, className }) {
  const classes = useStyles();
  return (
    <Link
      href={{ pathname: "/results", query: { search_query: hash } }}
      className={c(classes.text, className)}
    >
      {hash}
    </Link>
  );
}
