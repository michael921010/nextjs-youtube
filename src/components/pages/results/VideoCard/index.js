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
import { hasData } from "utils";
import { ChannelTitle, Skeleton } from "components/common";

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
  mediaImage: ({ width, height }) => ({
    width,
    height,
  }),
  skeleton: ({ width, height }) => ({
    width,
    height,
  }),
  titleSkeleton: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2),
  },
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
  desSkeleton: {
    marginLeft: theme.spacing(2),
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
        <div className={classes.media}>
          <Skeleton
            loading={!hasData(image?.src)}
            className={classes.skeleton}
            variant="rect"
          >
            <Link href={{ pathname: "/watch", query: { v: id } }}>
              <CardMedia
                className={classes.mediaImage}
                component="img"
                alt={title}
                width={width}
                height={height}
                image={image?.src}
                title={title}
              />
            </Link>
          </Skeleton>
        </div>

        <div>
          <Skeleton
            loading={!hasData(title)}
            width={300}
            height={10}
            className={classes.titleSkeleton}
          >
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
          </Skeleton>

          <ChannelTitle id={channelId} />

          <Skeleton
            loading={!hasData(description)}
            width={300}
            height={10}
            className={classes.desSkeleton}
          >
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
          </Skeleton>
        </div>
      </CardActionArea>
    </Card>
  );
}
