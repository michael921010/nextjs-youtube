import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { Skeleton } from "components/common";
import { Link } from "@next";
import { useChannel } from "utils/hooks";
import { hasData, amtFmt } from "utils";

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
  media: {
    width: 320,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  skeleton: {
    width: "100%",
    height: "100% !important",
  },
  avatar: {
    width: theme.spacing(17),
    height: theme.spacing(17),
    margin: theme.spacing(2, 0),
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
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
  content: {
    minWidth: theme.spacing(50),
  },
  statisticsContent: {
    display: "flex",
    flexDirection: "row",
  },
  statisticsSkeleton: {
    marginTop: theme.spacing(1),
  },
  statistics: {
    width: "fit-content",
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 1,
    color: theme.palette.text.secondary,
  },
  description: {
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
  subscribe: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: theme.spacing(2),

    [theme.breakpoints.down("sm")]: {
      display: "none",
    },
  },
  subsSkeleton: {
    borderRadius: 5,
    marginTop: theme.spacing(1),
  },
}));

export default function ChannelCard({ id, image }) {
  const classes = useStyles();

  const { error, loading, channel } = useChannel(id);
  const avatarUrl = channel?.snippet?.thumbnails?.default?.url ?? null;
  const title = channel?.snippet?.title ?? null;
  const statistics = channel?.statistics ?? null;

  return (
    <Card className={classes.root}>
      <Link
        href={{ pathname: "/channel/[channelId]", query: { channelId: id } }}
      >
        <CardActionArea className={classes.button} component="div">
          <div className={classes.media}>
            <div className={classes.avatar}>
              <Skeleton
                loading={error || loading || !hasData(image?.src)}
                className={classes.skeleton}
                variant="circle"
              >
                <CardMedia
                  className={classes.avatarImage}
                  component="img"
                  alt={title}
                  image={image?.src}
                  title={title}
                />
              </Skeleton>
            </div>
          </div>

          <CardContent className={classes.content}>
            <Skeleton
              loading={error || loading || !hasData(statistics)}
              height={10}
              width={200}
            >
              <Typography
                gutterBottom
                component="p"
                className={classes.title}
                title={title}
              >
                {title}
              </Typography>
            </Skeleton>

            <div className={classes.statisticsContent}>
              <Skeleton
                loading={error || loading || !hasData(statistics)}
                height={10}
                width={300}
                className={classes.statisticsSkeleton}
              >
                {!(statistics?.hiddenSubscriberCount ?? true) && (
                  <Typography
                    variant="body2"
                    component="p"
                    className={classes.statistics}
                  >
                    {amtFmt(statistics?.subscriberCount, 0)} 位訂閱者・
                  </Typography>
                )}
                <Typography
                  variant="body2"
                  component="p"
                  className={classes.statistics}
                >
                  {amtFmt(statistics?.videoCount)} 部影片
                </Typography>
              </Skeleton>
            </div>
          </CardContent>

          <div className={classes.subscribe}>
            <Skeleton
              loading={error || loading || !hasData(statistics)}
              variant="rect"
              height={32}
              width={56}
              className={classes.subsSkeleton}
            >
              <Button variant="contained" color="primary">
                訂閱
              </Button>
            </Skeleton>
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
}
