// Packages
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";
import { IRecipeData } from "../../types/globals";
import { recipeRouter } from "../../server/trpc/router/recipe";

// Components
import IngredientList from "../../components/recipe/IngredientList";
import DirectionsList from "../../components/recipe/DirectionsList";
import RecipeHeader from "../../components/recipe/RecipeHeader";
import RecipeImage from "../../components/recipe/RecipeImage";
import CommentList from "../../components/recipe/CommentList";

export default function RecipeIdPage() {
  const router = useRouter();
  const { id } = router.query;
  const utils = trpc.useContext();
  const { data } = trpc.recipe.getRecipeById.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      onSuccess(data) {
        if (typeof id === "string" && data) {
          viewMutation.mutate({
            id: id,
            views: data.views,
          });
        }
      },
    }
  );
  const viewMutation = trpc.recipe.addView.useMutation({
    onSuccess() {
      utils.recipe.getHomePage.invalidate();
      utils.recipe.getRecipesBySearch.invalidate();
    },
  });

  if (data && data.images)
    return (
      <main className="mx-auto max-w-7xl">
        <RecipeImage recipe={data} />
        <RecipeHeader recipe={data} />
        <div className="p-2">
          <IngredientList ingredients={data.ingredients} />
        </div>
        <div className="mt-4 p-2">
          <DirectionsList directions={data.directions} />
        </div>
        <div className="p-2">
          <CommentList recipe={data} />
        </div>
      </main>
    );
}
