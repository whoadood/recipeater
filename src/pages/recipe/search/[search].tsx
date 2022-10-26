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
import { ReducerRecipe } from "../../../types/globals";

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

  console.log(data);

  // const [recipes, recipeDispatch] = useReducer(
  //   recipeReducer,
  //   data?.recipes as ReducerRecipe[]
  // );

  return (
    <>
      {data && (
        <main>
          <PageHeader>
            <BrowsePageHeader />
          </PageHeader>
          <div className="pt-4">
            <BrowseList recipes={data} />
          </div>
        </main>
      )}
    </>
  );
}
