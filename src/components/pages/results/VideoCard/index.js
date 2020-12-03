import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link } from "@next";
import { ChannelTitle } from "components/common";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  media: ({ width, height }) => ({
    width,
    height,
  }),
  title: {
    width: "fit-content",
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 2,
    color: theme.palette.grey["800"],
    fontWeight: theme.fonts.bold,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  description: {
    width: "fit-content",
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 2,
    color: theme.palette.text.secondary,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function VideoCard({
  id,
  title,
  description,
  channelId,
  image,
}) {
  const width = image?.width ?? 0;
  const height = image?.height ?? 0;

  const classes = useStyles({ width, height });

  return (
    <Card className={classes.root}>
      <CardActionArea className={classes.button}>
        <Link href={{ pathname: "/watch", query: { v: id } }}>
          <CardMedia
            className={classes.media}
            component="img"
            alt={title}
            width={width}
            height={height}
            image={image?.src}
            title={title}
          />
        </Link>

        <div>
          <Link href={{ pathname: "/watch", query: { v: id } }}>
            <CardContent style={{ paddingBottom: 0 }}>
              <Typography
                gutterBottom
                component="p"
                className={classes.title}
                title={title}
              >
                {title}
              </Typography>
            </CardContent>
          </Link>

          <ChannelTitle id={channelId} />

          <Link href={{ pathname: "/watch", query: { v: id } }}>
            <CardContent style={{ paddingTop: 0 }}>
              <Typography
                variant="body2"
                component="p"
                className={classes.description}
                title={description}
              >
                {description}
              </Typography>
            </CardContent>
          </Link>
        </div>
      </CardActionArea>
    </Card>
  );
}
