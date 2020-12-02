import { Head } from "@next";
import { Layout, Drawer } from "components/common";

export default function Results({ search_query }) {
  return (
    <Layout>
      <Head title={search_query} />
      <Drawer>
        <h1>results: {search_query}</h1>
      </Drawer>
    </Layout>
  );
}

export async function getServerSideProps(ctx) {
  return { props: { search_query: ctx.query?.search_query } };
}
