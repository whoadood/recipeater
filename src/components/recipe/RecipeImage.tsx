// Packages
import React from "react";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";

// Utils
import { makeImageUrl } from "../../utils/makeImageUrl";

export default function RecipeHeader({
  recipe,
}: {
  recipe: inferProcedureOutput<AppRouter["recipe"]["getRecipeById"]>;
}) {
  return (
    <div
      style={{
        backgroundImage: `url('${makeImageUrl(recipe?.images[0])}')`,
      }}
      className={`opacity-1/2 relative h-96 max-w-7xl overflow-hidden bg-gray-600 bg-cover bg-center bg-no-repeat pb-4 bg-blend-overlay`}
    />
  );
}
