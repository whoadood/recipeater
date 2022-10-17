// Packages
import React from "react";
import { useRouter } from "next/router";
import RecipeHeader from "../../components/recipe/RecipeHeader";
import IngredientList from "../../components/recipe/IngredientList";
import DirectionsList from "../../components/recipe/DirectionsList";

export default function RecipeIdPage() {
  const router = useRouter();
  const { recipezId } = router.query;
  return (
    <main className="mx-auto max-w-7xl">
      <RecipeHeader />
      <div className="p-2">
        <IngredientList />
      </div>
      <div className="mt-4">
        <DirectionsList />
      </div>
    </main>
  );
}
