// Packages
import { Fragment } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { trpc } from "../utils/trpc";

// Components
import Hero from "../components/global/Hero";
import PageHeader from "../components/global/PageHeader";
import BrowseCard from "../components/browse/BrowseCard";
import { ReducerRecipe } from "../types/globals";

const Home: NextPage = () => {
  const { data: featured } = trpc.recipe.getHomePage.useQuery();

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
      <main className="mx-auto max-w-7xl">
        <PageHeader>
          <Hero />
        </PageHeader>
        <div className="px-8 py-4">
          <h2 className="text-lg">Featured Recipe</h2>
          {featured && featured[0] && (
            <BrowseCard recipe={featured[0] as ReducerRecipe} />
          )}
          <h2 className="text-lg">Recent recipes</h2>
          <ul className="flex flex-col gap-2 xl:flex-row">
            {featured &&
              featured.slice(1).map((rec) => (
                <li className="flex-1" key={rec.id}>
                  <BrowseCard recipe={rec as ReducerRecipe} />
                </li>
              ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
