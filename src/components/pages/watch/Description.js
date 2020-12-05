import { makeStyles } from "@material-ui/core/styles";
import { descriptionFmt } from "utils";
import HashTag from "./HashTag";
import Url from "./Url";

const rags = [
  { reg: /\n/g, type: "skip", skipTheSame: true },
  { reg: /#/g, type: "hash" },
  { reg: /http/g, type: "url" },
];

const useStyle = makeStyles((theme) => ({
  text: {
    minHeight: theme.spacing(2),
    whiteSpace: "pre-wrap",
    fontSize: 13,
  },
}));

export default function Description({ msg = "" }) {
  const classes = useStyle();

  const fmtMsg = descriptionFmt(msg, rags);

  return fmtMsg.map(({ type, msg }, iMsg) => {
    const key = `${type}-${iMsg}`;
    switch (type) {
      case "hash":
        return <HashTag hash={msg} key={key} />;
      case "url":
        return <Url url={msg} key={key} />;
      default:
        return (
          <span key={key} className={classes.text}>
            {msg}
          </span>
        );
    }
  });
}
