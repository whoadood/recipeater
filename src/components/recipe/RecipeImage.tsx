// Packages
import React from "react";
import { env } from "../../env/client.mjs";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";
import Link from "next/link";

export default function RecipeHeader({
  recipe,
}: {
  recipe: inferProcedureOutput<AppRouter["recipe"]["getRecipeById"]>;
}) {
  return (
    <div
      style={{
        backgroundImage: `url('https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/v${recipe?.images[0]?.version}/${recipe?.images[0]?.public_id}')`,
      }}
      className={`opacity-1/2 relative h-96 max-w-7xl overflow-hidden bg-gray-600 bg-cover bg-center bg-no-repeat pb-4 bg-blend-overlay`}
    />
  );
}
