import { useMemo, useState } from "react";
import { Head, Link } from "@next";
import { Layout } from "components/common";
import { Typography, Divider } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { videos } from "apis/youtube";
import { amtFmt, getBy, hasData } from "utils";
import { dateFmt } from "utils/date";
import { Description } from "components/pages/watch";

const useStyle = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.system,
    padding: theme.spacing(3, 7),
    display: "flex",
    flexDirection: "column",
    // alignItems: "center",
  },
  content: {
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
  channelTitle: {
    fontSize: theme.fonts.bg,
    fontWeight: theme.fonts.bold,
    margin: theme.spacing(1, 0),
  },
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
  const [expanded, setExpanded] = useState(false);
  const showQuantity = useMemo(() => (expanded ? Infinity : defaultQuantity), [
    expanded,
  ]);
  const classes = useStyle();

  console.log(data);
  const { id, snippet, statistics, player } = data;

  const description = useMemo(() => snippet.description.split(/\n/).slice(0), [
    snippet.description,
    showQuantity,
  ]);
  const showExpand = description.length > defaultQuantity;

  return (
    <Layout>
      {snippet.title && <Head title={snippet.title} />}
      <div className={classes.root}>
        <div dangerouslySetInnerHTML={{ __html: player.embedHtml }} />
        <div className={classes.content}>
          <Typography className={classes.title}>{snippet.title}</Typography>
          <div className={classes.explain}>
            <Typography className={classes.viewCount}>
              觀看次數：{amtFmt(statistics.viewCount, 0)} 次
            </Typography>
            <Typography className={classes.publishedTime}>
              ・{dateFmt(snippet.publishedAt)}
            </Typography>
          </div>
        </div>
        <Divider className={classes.divider} />
        <div className={classes.channel}>
          <Link
            href={{
              pathname: "/channel/[channelId]",
              query: { channelId: snippet.channelId },
            }}
          >
            <Typography className={classes.channelTitle}>
              {snippet.channelTitle}
            </Typography>
          </Link>
          {description.splice(0, showQuantity).map((s, i) => (
            <Description key={i} msg={s} />
          ))}
        </div>
        {showExpand && (
          <Typography
            className={classes.expand}
            onClick={() => setExpanded((v) => !v)}
          >
            {expanded ? "只顯示部份資訊" : "顯示完整資訊"}
          </Typography>
        )}
        <Divider className={classes.divider} />
      </div>
    </Layout>
  );
}
export async function getServerSideProps(ctx) {
  const videoId = ctx.query?.v;

  try {
    const res = await videos(videoId);

    const item = getBy("find")({ id: videoId })(res.data?.items ?? []);
    if (res?.status === 200 && hasData(item)) {
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
