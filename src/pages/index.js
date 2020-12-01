import { Head, Link } from "@next";
import { makeStyles } from "@material-ui/core/styles";
import { Layout, Card } from "components/common";
import { search } from "apis/youtube";
import data from "data/search";

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
      {!virtual ? (
        JSON.stringify(data, null, 4)
      ) : (
        <ul className={classes.list}>
          {data.items.map(({ id, snippet = {} }) => {
            const {
              title,
              channelTitle,
              thumbnails = {},
              resourceId = {},
            } = snippet;
            return (
              <Link
                href={{ pathname: "/watch", query: { v: id.videoId } }}
                key={id.videoId}
                className={classes.link}
              >
                <Card
                  title={title}
                  channelTitle={channelTitle}
                  image={{
                    width: thumbnails.medium?.width,
                    height: thumbnails.medium?.height,
                    src: thumbnails.medium?.url,
                  }}
                />
              </Link>
            );
          })}
        </ul>
      )}
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
      const res = await search();
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
