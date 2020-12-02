import { Head } from "@next";
import { Layout, Drawer } from "components/common";

export default function Chaneel({ channelId }) {
  return (
    <Layout>
      <Head title={channelId} />
      <Drawer>
        <h1>channel: {channelId}</h1>
      </Drawer>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return { props: { channelId: ctx.query?.channelId } };
}
