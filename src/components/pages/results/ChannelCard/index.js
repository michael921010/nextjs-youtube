import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
  Button,
  withStyles,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { BlockRounded } from "@material-ui/icons";
import { Link } from "@next";
import { hasData, getBy, amtFmt } from "utils";
import * as youtube from "apis/youtube";

const MySkeleton = withStyles((theme) => ({
  root: {
    marginTop: theme.spacing(1),
  },
}))(Skeleton);

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
    height: "100%",
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
}));

export default function ChannelCard({ id, image }) {
  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(null);
  const [statistics, setStatistics] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        if (hasData(id)) {
          setLoading(true);
          setError(false);

          const { status, data } = await youtube.channels(id);

          if (status === 200) {
            const { statistics, snippet } = getBy("find")({ id })(data.items);
            const { thumbnails } = snippet;
            const avatarUrl = thumbnails?.high?.url ?? null;

            if (hasData(avatarUrl)) {
              setAvatarUrl(avatarUrl);
              setTitle(snippet?.title);
              setStatistics(statistics);
            } else {
              throw "";
            }
          } else {
            throw "";
          }
        } else {
          throw "";
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <Card className={classes.root}>
      <Link
        href={{ pathname: "/channel/[channelId]", query: { channelId: id } }}
      >
        <CardActionArea className={classes.button} component="div">
          <div className={classes.media}>
            <div className={classes.avatar}>
              {error ? (
                <BlockRounded className={classes.skeleton} color="error" />
              ) : loading || !hasData(image?.src) ? (
                <Skeleton variant="circle" className={classes.skeleton} />
              ) : (
                <CardMedia
                  className={classes.avatarImage}
                  component="img"
                  alt={title}
                  image={image?.src}
                  title={title}
                />
              )}
            </div>
          </div>

          <CardContent className={classes.content}>
            {error || loading || !hasData(statistics) ? (
              <MySkeleton height={10} width={100} />
            ) : (
              <Typography
                gutterBottom
                component="p"
                className={classes.title}
                title={title}
              >
                {title}
              </Typography>
            )}

            <div className={classes.statisticsContent}>
              {error || loading || !hasData(statistics) ? (
                <MySkeleton height={10} width={200} />
              ) : (
                <>
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
                    {amtFmt(statistics?.videoCount, 0)} 部影片
                  </Typography>
                </>
              )}
            </div>
          </CardContent>

          <div className={classes.subscribe}>
            {error || loading || !hasData(statistics) ? (
              <MySkeleton
                variant="rect"
                height={32}
                width={56}
                style={{ borderRadius: 5 }}
              />
            ) : (
              <Button variant="contained" color="primary">
                訂閱
              </Button>
            )}
          </div>
        </CardActionArea>
      </Link>
    </Card>
  );
}
