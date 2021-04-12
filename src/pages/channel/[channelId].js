import { Head } from "@next";
import Image from "material-ui-image";
import {
  AppBar,
  Toolbar,
  CardHeader,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Drawer } from "components/common";
import { TabPanel, ChannelSection } from "components/pages/channel";
import { getBy, hasData, amtFmt } from "utils";
import * as youtube from "apis/youtube";

const bannerSetting =
  "=w2560-fcrop64=1,00005a57ffffa5a8-k-c0xffffffff-no-nd-rj";

const useStyles = makeStyles((theme) => ({
  bannerImage: {
    width: "100%",
    height: "auto",
  },
  toobar: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: theme.spacing(2, 10),
    backgroundColor: theme.palette.common.white,
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginRight: theme.spacing(3),
  },
  avatarImage: {
    borderRadius: "50%",
  },
  caption: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  channel: {
    display: "flex",
    flexDirection: "column",
  },
  channelTitle: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  subscriberCount: {
    width: "fit-content",
    color: theme.palette.text.secondary,
  },
  tabPanel: {
    backgroundColor: theme.palette.common.white,
    paddingLeft: theme.spacing(5),
  },
  channelSection: {
    padding: theme.spacing(3, 7),
  },
}));

export default function Chaneel({ data }) {
  const { id, snippet, statistics, brandingSettings } = data;
  const bannerExternalUrl = brandingSettings?.image?.bannerExternalUrl ?? null;
  const avatar = snippet?.thumbnails?.medium ?? null;

  const classes = useStyles({});

  return (
    <Layout>
      <Head title={snippet?.title} />
      <Drawer container={false}>
        {/* <Image
          imageStyle={{ width: "100%", height: "auto" }}
          src={bannerExternalUrl + bannerSetting}
        /> */}
        <CardMedia component="img" image={bannerExternalUrl + bannerSetting} />

        <Toolbar className={classes.toobar}>
          <div className={classes.avatar}>
            <CardMedia
              component="img"
              image={avatar?.url}
              className={classes.avatarImage}
            />
          </div>

          <div className={classes.caption}>
            <div className={classes.channel}>
              <Typography variant="h5" className={classes.channelTitle}>
                {snippet?.title}
              </Typography>
              <Typography
                variant="body2"
                component="p"
                className={classes.subscriberCount}
              >
                {amtFmt(statistics?.subscriberCount)} 位訂閱者
              </Typography>
            </div>

            <Button variant="contained" color="primary">
              訂閱
            </Button>
          </div>
        </Toolbar>

        <div className={classes.tabPanel}>
          <TabPanel />
        </div>

        <div className={classes.channelSection}>
          <ChannelSection id={id} />
        </div>
      </Drawer>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  try {
    const channelId = ctx.query?.channelId;

    const { status, data } = await youtube.channels(channelId);

    const item = getBy("find")({ id: channelId })(data?.items ?? []);
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
