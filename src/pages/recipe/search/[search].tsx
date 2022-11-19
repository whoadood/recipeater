// Packages
import React, { Reducer, useReducer } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../../utils/trpc";

// Hooks
import { recipeReducer } from "../../../hooks/recipeReducer";

// Components
import PageHeader from "../../../components/global/PageHeader";
import BrowsePageHeader from "../../../components/browse/BrowsePageHeader";
import BrowseList from "../../../components/browse/BrowseList";
import Head from "next/head";

export default function BrowsePage() {
  const { query } = useRouter();
  const { data } = trpc.recipe.getRecipesBySearch.useQuery(
    {
      search:
        query?.search && query.search !== "all"
          ? (query.search as string)
          : null,
    },
    { enabled: !!query.search }
  );

  return (
    <>
      <Head>
        <title>Browse Recipes</title>
        <meta
          name="description"
          content={`Browse our awesome collection of recipes`}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {data && (
        <main className="mx-auto max-w-7xl">
          <BrowseList recipes={data} />
        </main>
      )}
    </>
  );
}
