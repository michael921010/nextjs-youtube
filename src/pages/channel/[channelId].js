import { Head } from "@next";

export default function Chaneel({ channelId }) {
  return (
    <>
      <Head title={channelId} />
      <h1>{channelId}</h1>;
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: { channelId: ctx.query?.channelId } };
}
