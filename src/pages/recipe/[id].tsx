// Packages
import React from "react";
import { useRouter } from "next/router";
import RecipeHeader from "../../components/recipe/RecipeHeader";
import IngredientList from "../../components/recipe/IngredientList";
import DirectionsList from "../../components/recipe/DirectionsList";
import { trpc } from "../../utils/trpc";
import { IRecipeData } from "../../types/globals";
import { recipeRouter } from "../../server/trpc/router/recipe";

export default function RecipeIdPage() {
  const router = useRouter();
  const { id } = router.query;
  const { data } = trpc.recipe.getRecipeById.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
    }
  );
  if (data && data.images)
    return (
      <main className="mx-auto max-w-7xl">
        <RecipeHeader recipe={data} />
        <div className="p-2">
          <IngredientList ingredients={data.ingredients} />
        </div>
        <div className="mt-4 p-2">
          <DirectionsList directions={data.directions} />
        </div>
      </main>
    );
}
