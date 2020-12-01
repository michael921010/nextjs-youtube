import { Link } from "@next";
import { Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import c from "classnames";
const useStyle = makeStyles((theme) => ({
  text: {
    minHeight: theme.spacing(2),
  },
  httpZone: {
    display: "flex",
    flexDirection: "row",
  },
  url: {
    color: theme.palette.link.main,
    fontSize: 13,
    marginLeft: theme.spacing(1),
  },
  description: {
    fontSize: 13,
  },
  hashZone: {
    display: "flex",
    flexDirection: "row",
  },
  hash: {
    "&:not(:first-child)": {
      marginLeft: theme.spacing(1),
    },
  },
}));

export default function Description({ msg }) {
  const classes = useStyle();
  if (/http/.test(msg)) {
    const url = msg.slice(msg.indexOf("http"));
    const description = msg.split(url);

    return (
      <span className={classes.httpZone}>
        {description.map((s, i) => (
          <Typography key={i} className={c(classes.text, classes.description)}>
            {s}
          </Typography>
        ))}
        <Link href={url}>
          <Typography className={c(classes.text, classes.url)}>
            {url}
          </Typography>
        </Link>
      </span>
    );
  }

  if (/#/.test(msg)) {
    return (
      <span className={classes.hashZone}>
        {msg.split(/\s/).map((hash, i) => (
          <Link
            key={i}
            href={{
              pathname: "/results",
              query: { search_query: hash },
            }}
            className={classes.hash}
          >
            <Typography className={c(classes.text, classes.url)}>
              {hash}
            </Typography>
          </Link>
        ))}
      </span>
    );
  }

  return (
    <span>
      <Typography className={c(classes.text, classes.description)}>
        {msg}
      </Typography>
    </span>
  );
}
