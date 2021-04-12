import { Link } from "@next";
import { makeStyles } from "@material-ui/core/styles";
import { CardContent, CardMedia, Typography } from "@material-ui/core";
import { Skeleton } from "components/common";
import { hasData } from "utils";
import { useChannel } from "utils/hooks";

const avatarSize = { width: 30, height: 30 };
const useStyles = makeStyles((theme) => ({
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
    height: "100% !important",
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
  const classes = useStyles();

  const { error, loading, channel } = useChannel(id);
  const avatarUrl = channel?.snippet?.thumbnails?.default?.url ?? null;
  const title = channel?.snippet?.title ?? null;

  return (
    <Link href={{ pathname: "/channel/[channelId]", query: { channelId: id } }}>
      <CardContent className={classes.content}>
        <div className={classes.avatar}>
          <Skeleton
            loading={error || loading || !hasData(avatarUrl)}
            className={classes.skeleton}
            variant="circle"
          >
            <CardMedia
              className={classes.avatarImage}
              component="img"
              alt={title}
              image={avatarUrl}
              title={title}
            />
          </Skeleton>
        </div>

        <Skeleton
          loading={error || loading || !hasData(title)}
          animation="wave"
          height={10}
          width="80%"
        >
          <Typography
            variant="body2"
            component="p"
            className={classes.title}
            title={title}
          >
            {title}
          </Typography>
        </Skeleton>
      </CardContent>
    </Link>
  );
}
