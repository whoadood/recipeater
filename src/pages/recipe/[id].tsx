// Packages
import React from "react";
import { useRouter } from "next/router";

export default function RecipeIdPage() {
  const router = useRouter();
  const { recipeId } = router.query;
  return <div>recipe {recipeId} page</div>;
}
