import { useState, useEffect } from "react";
import { Link } from "@next";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import { BlockRounded } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";
import { getBy, hasData } from "utils";
import * as youtube from "apis/youtube";

const avatarSize = { width: 30, height: 30 };
const useStyle = makeStyles((theme) => ({
  content: {
    paddingTop: `${theme.spacing(1)}px !important`,
    paddingBottom: `${theme.spacing(1)}px !important`,

    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: avatarSize.width,
    height: avatarSize.height,
    marginRight: theme.spacing(2),
  },
  avatarImage: {
    height: "100%",
    borderRadius: "50%",
  },
  skeleton: {
    width: "100%",
    height: "100%",
  },
  title: {
    width: "fit-content",
    color: theme.palette.text.secondary,

    "&:hover": {
      color: theme.palette.text.primary,
    },
  },
}));

export default function ChannelTitle({ id }) {
  const classes = useStyle();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [title, setTitle] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    (async function () {
      try {
        if (hasData(id)) {
          setLoading(true);
          setError(false);

          const { status, data } = await youtube.channels(id);

          if (status === 200) {
            const { snippet } = getBy("find")({ id })(data.items);
            const { thumbnails } = snippet;
            const avatarUrl = thumbnails?.default?.url ?? null;

            if (hasData(avatarUrl)) {
              setTitle(snippet?.title);
              setAvatarUrl(avatarUrl);
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
    <Link
      href={{
        pathname: "/channel/[channelId]",
        query: { channelId: id },
      }}
    >
      <CardContent className={classes.content}>
        <div className={classes.avatar}>
          {error ? (
            <BlockRounded className={classes.skeleton} color="error" />
          ) : loading || !hasData(avatarUrl) ? (
            <Skeleton variant="circle" className={classes.skeleton} />
          ) : (
            <CardMedia
              className={classes.avatarImage}
              component="img"
              alt={title}
              image={avatarUrl}
              title={title}
            />
          )}
        </div>

        {error ? (
          <Skeleton animation="wave" height={10} width="80%" />
        ) : loading || !hasData(title) ? (
          <Skeleton animation="wave" height={10} width="80%" />
        ) : (
          <Typography
            variant="body2"
            component="p"
            className={classes.title}
            title={title}
          >
            {title}
          </Typography>
        )}
      </CardContent>
    </Link>
  );
}
