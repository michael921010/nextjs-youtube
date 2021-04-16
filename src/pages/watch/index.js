import { useState } from "react";
import { Head, Link } from "@next";
import { Layout, Skeleton } from "components/common";
import { Typography, Divider, CardMedia } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as youtube from "apis/youtube";
import { amtFmt, getBy, hasData } from "utils";
import { dateFmt } from "utils/date";
import { useChannel } from "utils/hooks";
import { Description } from "components/pages/watch";

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.system,
    padding: theme.spacing(3, 7),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  statisticsContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  title: {
    fontSize: theme.fonts.lg,
    margin: theme.spacing(1, 0),
    overflow: `hidden`,
    textOverflow: `ellipsis`,
    display: `-webkit-box`,
    "-webkit-box-orient": `vertical`,
    "-webkit-line-clamp": 2,
  },
  explain: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  viewCount: {
    fontSize: theme.fonts.md,
    color: theme.palette.grey.A700,
  },
  publishedTime: {
    fontSize: theme.fonts.md,
    color: theme.palette.grey.A700,
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
  channel: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: theme.spacing(5),
    height: theme.spacing(5),
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
  channelTitle: {
    fontSize: theme.fonts.bg,
    fontWeight: theme.fonts.bold,
    margin: theme.spacing(1, 0),
  },
  content: {
    paddingLeft: theme.spacing(5) + theme.spacing(2),
    display: "block",
  },
  description: ({ expanded }) => ({
    height: expanded ? "auto" : 60,
    overflow: "hidden",
  }),
  expand: {
    width: "fit-content",
    marginTop: theme.spacing(1),
    fontSize: theme.fonts.md,
    color: theme.palette.grey.A700,

    "&:hover": {
      cursor: "pointer",
    },
  },
}));

const defaultQuantity = 4;
export default function Watch({ data }) {
  const { id, snippet, statistics, player } = data;
  const channelId = snippet?.channelId;

  const { error, loading, channel } = useChannel(channelId);
  const avatarUrl = channel?.snippet?.thumbnails?.default?.url ?? null;

  const [expanded, setExpanded] = useState(false);
  const showExpand = snippet?.description.length > defaultQuantity;
  const classes = useStyles({ expanded: showExpand ? expanded : true });

  return (
    <Layout>
      <Head title={snippet?.title} />
      <div className={classes.root}>
        <div dangerouslySetInnerHTML={{ __html: player?.embedHtml }} />

        <div className={classes.statisticsContent}>
          <Skeleton
            loading={error || loading || !hasData(snippet)}
            width={300}
            height={10}
          >
            <Typography className={classes.title}>{snippet?.title}</Typography>
          </Skeleton>

          <Skeleton
            loading={error || loading || !hasData(statistics)}
            width={300}
            height={10}
          >
            <div className={classes.explain}>
              <Typography className={classes.viewCount}>
                觀看次數：{amtFmt(statistics?.viewCount)} 次
              </Typography>
              {snippet?.publishedAt && (
                <Typography className={classes.publishedTime}>
                  ・{dateFmt(snippet.publishedAt)}
                </Typography>
              )}
            </div>
          </Skeleton>
        </div>

        <Divider className={classes.divider} />

        <div>
          <div className={classes.channel}>
            <div className={classes.avatar}>
              <Skeleton
                loading={error || loading || !hasData(avatarUrl)}
                variant="circle"
                className={classes.skeleton}
              >
                <Link
                  href={{
                    pathname: "/channel/[channelId]",
                    query: { channelId },
                  }}
                >
                  <CardMedia
                    className={classes.avatarImage}
                    component="img"
                    alt={snippet?.channelTitle}
                    image={avatarUrl}
                    title={snippet?.channelTitle}
                  />
                </Link>
              </Skeleton>
            </div>
            <Link
              href={{ pathname: "/channel/[channelId]", query: { channelId } }}
            >
              <Typography className={classes.channelTitle}>
                {snippet?.channelTitle}
              </Typography>
            </Link>
          </div>

          <div className={classes.content}>
            <div className={classes.description}>
              <Description msg={snippet?.description} />
            </div>
            {showExpand && (
              <Typography
                className={classes.expand}
                onClick={() => setExpanded((v) => !v)}
              >
                {expanded ? "只顯示部份資訊" : "顯示完整資訊"}
              </Typography>
            )}
          </div>
        </div>

        <Divider className={classes.divider} />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  const videoId = ctx.query?.v;

  try {
    const { status, data } = await youtube.videos(videoId);

    const item = getBy("find")({ id: videoId })(data?.items ?? []);
    if (status === 200 && hasData(item)) {
      return {
        props: {
          data: item,
        },
      };
    } else {
      throw "";
    }
  } catch (err) {
    return {
      props: {
        data: {},
      },
    };
  }
}
