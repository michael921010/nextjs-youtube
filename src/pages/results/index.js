import { Head } from "@next";

export default function Results({ search_query }) {
  return (
    <>
      <Head title={search_query} />
      <h1>{search_query}</h1>;
    </>
  );
}

export async function getServerSideProps(ctx) {
  return { props: { search_query: ctx.query?.search_query } };
}
