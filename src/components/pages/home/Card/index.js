import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";
import { Link } from "@next";
import { getBy, hasData, amtFmt } from "utils";
import { ChannelTitle } from "components/common";
import * as youtube from "apis/youtube";

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

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [statistics, setStatistics] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        if (hasData(id)) {
          setLoading(true);
          setError(false);

          const { status, data } = await youtube.videos(id);

          if (status === 200) {
            const { statistics } = getBy("find")({ id })(data.items);
            setStatistics(statistics);
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
      <CardActionArea>
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

        <CardContent className={classes.statisticsContent}>
          {error ? (
            <Skeleton animation="wave" height={10} width="50%" />
          ) : loading || !hasData(statistics) ? (
            <Skeleton animation="wave" height={10} width="50%" />
          ) : (
            <Typography
              gutterBottom
              variant="body2"
              component="p"
              className={classes.viewCount}
            >
              觀看次數: {amtFmt(statistics.viewCount, 0)} 次
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
