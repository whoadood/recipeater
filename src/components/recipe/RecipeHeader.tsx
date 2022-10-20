// Packages
import React from "react";
import { IRecipeData } from "../../types/globals";
import { env } from "../../env/client.mjs";
import { profile } from "console";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";

export default function RecipeHeader({
  recipe,
}: {
  recipe: inferProcedureOutput<AppRouter["recipe"]["getRecipeById"]>;
}) {
  return (
    <div
      style={{
        backgroundImage: `url('https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/v${recipe.images[0]?.version}/${recipe.images[0]?.public_id}')`,
      }}
      className={`opacity-1/2 relative overflow-hidden bg-gray-600 bg-cover bg-center bg-no-repeat pb-4 bg-blend-overlay`}
    >
      <div className="mx-auto max-w-7xl">
        <main className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="pr-15 font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
              <span className="block xl:inline">{recipe?.title}</span>{" "}
            </h1>
            <p className="mt-3 text-base text-white/70 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              {recipe?.description}
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <div className="rounded-md shadow">
                <a
                  href={`/profile/${recipe?.user_id}`}
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-cyan-600 px-8 py-3 text-base font-medium text-white hover:bg-cyan-700 md:py-4 md:px-10 md:text-lg"
                >
                  View Author
                </a>
              </div>
              <div className="mt-3 sm:mt-0 sm:ml-3">
                <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-cyan-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                >
                  Like Recipe?
                </a>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
