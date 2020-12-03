import { Head } from "@next";
import { useRouter } from "next/router";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Drawer } from "components/common";
import { VideoCard, ChannelCard } from "components/pages/results";
import * as youtube from "apis/youtube";

const useStyle = makeStyles((theme) => ({
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
  },
  link: {
    padding: `10px 5px`,
  },
}));

export default function Results({ data }) {
  const classes = useStyle();
  const router = useRouter();
  console.log(data);
  return (
    <Layout>
      <Head title={router.query?.search_query} />
      <Drawer>
        <ul className={classes.list}>
          {data.items.map(({ id, snippet = {} }) => {
            const {
              title,
              description,
              channelTitle,
              channelId,
              thumbnails,
            } = snippet;
            if (id?.kind.includes("#channel")) {
              return (
                <div className={classes.link} key={channelId}>
                  <ChannelCard
                    id={id.channelId}
                    title={channelTitle}
                    description={description}
                    image={{
                      src: thumbnails?.medium?.url,
                    }}
                  />
                </div>
              );
            }
            if (id?.kind.includes("#video")) {
              return (
                <div className={classes.link} key={id.videoId}>
                  <VideoCard
                    id={id.videoId}
                    title={title}
                    description={description}
                    channelId={channelId}
                    image={{
                      width: thumbnails?.medium?.width,
                      height: thumbnails?.medium?.height,
                      src: thumbnails?.medium?.url,
                    }}
                  />
                </div>
              );
            }
            return null;
          })}
        </ul>
      </Drawer>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  const q = ctx.query?.search_query;

  try {
    const res = await youtube.search({ q, maxResults: 15 });

    if (res?.status === 200) {
      return {
        props: {
          data: res.data ?? {},
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
