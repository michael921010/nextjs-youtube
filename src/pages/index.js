import { makeStyles } from "@material-ui/core/styles";
import { Layout, Drawer } from "components/common";
import { Card } from "components/pages/home";
import * as youtube from "apis/youtube";
import data from "data/search.json";

const useStyle = makeStyles((theme) => ({
  list: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    flexWrap: "wrap",
  },
  link: {
    padding: `10px 5px`,
  },
}));

const virtual = true;
export default function Home({ data }) {
  const classes = useStyle();
  console.log(data);
  return (
    <Layout>
      <Drawer>
        {!virtual ? (
          JSON.stringify(data, null, 4)
        ) : (
          <ul className={classes.list}>
            {data.items.map(({ id, snippet = {} }) => {
              const { title, channelId, thumbnails = {} } = snippet;
              return (
                <div className={classes.link} key={id.videoId}>
                  <Card
                    id={id.videoId}
                    title={title}
                    channelId={channelId}
                    image={{
                      width: thumbnails.medium?.width,
                      height: thumbnails.medium?.height,
                      src: thumbnails.medium?.url,
                    }}
                  />
                </div>
              );
            })}
          </ul>
        )}
      </Drawer>
    </Layout>
  );
}

export async function getServerSideProps() {
  if (virtual) {
    return {
      props: { data },
    };
  } else {
    try {
      const res = await youtube.search({
        q: "Chris Paul",
      });

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
}
