import React from "react";
import { makeStyles, fade } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Link } from "@next";

const useStyles = makeStyles((theme) => ({
  root: ({ width }) => ({
    width,
  }),
  media: ({ width, height }) => ({
    width,
    height,
  }),
  title: {
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
  channel: {
    width: "fit-content",
    color: theme.palette.text.secondary,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function MyCard({ title, channel, image }) {
  const width = image?.width ?? 0;
  const height = image?.height ?? 0;

  const classes = useStyles({ width, height });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          component="img"
          alt="Contemplative Reptile"
          width={width}
          height={height}
          image={image?.src}
          title={title}
        />

        <CardContent>
          <Typography
            gutterBottom
            component="p"
            className={classes.title}
            title={title}
          >
            {title}
          </Typography>
          <Link
            href={{
              pathname: "/channel/[channelId]",
              query: { channelId: channel?.id },
            }}
          >
            <Typography
              variant="body2"
              component="p"
              className={classes.channel}
              title={channel?.title}
            >
              {channel?.title}
            </Typography>
          </Link>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
