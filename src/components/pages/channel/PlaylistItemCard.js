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
import { ChannelTitle } from "components/common";
import { useVideo } from "utils/hooks";

const useStyles = makeStyles((theme) => ({
  root: ({ resultsPerPage }) => ({
    marginLeft: theme.spacing(1),
    width:
      resultsPerPage &&
      `calc((100% - ${
        (resultsPerPage - 1) * theme.spacing(1)
      }px) / ${resultsPerPage})`,

    "&:first-child": {
      marginLeft: 0,
    },
  }),
  media: ({ width, height }) => ({
    width: "100%",
    minHeight: theme.spacing(15),
  }),
  mediaImage: ({ width, height }) => ({
    // width,
    // height,
    width: "100%",
    height: "100%",
  }),
  titleSkeleton: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(1),
  },
  tilteContent: {
    padding: `${theme.spacing(1)}px !important`,
  },
  title: {
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 2,
    color: theme.palette.grey["800"],
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.fonts.md,
    lineHeight: 1,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  channelTitle: {
    width: "fit-content",
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 1,
    color: theme.palette.text.secondary,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
  channelTitleContent: {
    padding: `${theme.spacing(0, 1)} !important`,
  },
  statisticsContent: {
    padding: `${theme.spacing(0, 1)} !important`,
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

export default function PlaylistItemCard({ videoId, resultsPerPage }) {
  const { error, loading, video } = useVideo(videoId);

  const title = video?.snippet?.title;
  const channelTitle = video?.snippet?.channelTitle;
  const image = video?.snippet?.thumbnails?.medium ?? null;
  const statistics = video?.statistics ?? null;

  const classes = useStyles({
    resultsPerPage,
    width: image?.width,
    height: image?.height,
  });

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <div className={classes.media}>
          <Skeleton
            loading={error || loading || !hasData(image?.url)}
            width="100%"
            height="100%"
            variant="rect"
          >
            <Link href={{ pathname: "/watch", query: { v: videoId } }}>
              <CardMedia
                className={classes.mediaImage}
                component="img"
                alt={title}
                // width={image?.width}
                // height={image?.height}
                image={image?.url}
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
          <Link href={{ pathname: "/watch", query: { v: videoId } }}>
            <CardContent className={classes.tilteContent}>
              <Typography
                component="span"
                className={classes.title}
                title={title}
              >
                {title}
              </Typography>
            </CardContent>
          </Link>
        </Skeleton>

        <Skeleton
          loading={error || loading || !hasData(channelTitle)}
          width="90%"
          height={10}
          className={classes.titleSkeleton}
        >
          <Link
            href={{
              pathname: "/channel/[channelId]",
              query: { channelId: video?.snippet?.channelId },
            }}
          >
            <CardContent className={classes.channelTitleContent}>
              <Typography
                variant="body2"
                component="p"
                className={classes.channelTitle}
                title={title}
              >
                {channelTitle}
              </Typography>
            </CardContent>
          </Link>
        </Skeleton>

        {/* <ChannelTitle id={channelId} /> */}

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
              觀看次數: {amtFmt(statistics?.viewCount)} 次
            </Typography>
          </Skeleton>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
