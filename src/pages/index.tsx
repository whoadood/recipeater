// packages
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

// copmonents
import Hero from "../components/global/Hero";
import PageHeader from "../components/global/PageHeader";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>Recipeater</title>
        <meta
          name="description"
          content="Seemlessly revisit all your favorite recipes"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="min-h-screen">
        <PageHeader>
          <Hero />
        </PageHeader>
      </main>
    </>
  );
};

export default Home;
