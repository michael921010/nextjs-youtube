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
import { Skeleton } from "components/common";
import { hasData, amtFmt } from "utils";
import { useVideo } from "utils/hooks";
import { ChannelTitle } from "components/common";

const useStyles = makeStyles((theme) => ({
  root: ({ width }) => ({
    width,
  }),
  media: ({ width, height }) => ({
    width,
    height,
  }),
  mediaImage: ({ width, height }) => ({
    width,
    height,
  }),
  titleSkeleton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(2),
  },
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
  statisticsContent: {
    paddingTop: `0 !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,
  },
  viewCount: {
    width: "fit-content",
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 1,
    color: theme.palette.text.secondary,
  },
}));

export default function MyCard({ id, title, channelId, image }) {
  const width = image?.width ?? 0;
  const height = image?.height ?? 0;

  const classes = useStyles({ width, height });

  const { error, loading, video } = useVideo(id);
  const statistics = video?.statistics ?? null;

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.media}>
          <Skeleton
            loading={error || loading || !hasData(image?.src)}
            width="100%"
            height="100%"
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

        <Skeleton
          loading={error || loading || !hasData(title)}
          width="90%"
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

        <CardContent className={classes.statisticsContent}>
          <Skeleton
            loading={error || loading || !hasData(statistics)}
            animation="wave"
            height={10}
            width="50%"
          >
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              className={classes.viewCount}
            >
              觀看次數: {amtFmt(statistics?.viewCount, 0)} 次
            </Typography>
          </Skeleton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
