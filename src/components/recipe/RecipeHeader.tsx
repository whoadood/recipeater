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
    <div className={`relative overflow-hidden pb-4`}>
      <div className="mx-auto max-w-7xl">
        <main className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
          <div className="sm:text-center lg:text-left">
            <h1 className="pr-15 font-bold tracking-tight text-cyan-500 sm:text-5xl md:text-6xl">
              <span className="block xl:inline">{recipe?.title}</span>
            </h1>
            <div className="mt-2 flex">
              <p className="rounded-md bg-cyan-500 p-2 font-bold text-white">
                {recipe?.category.name}
              </p>
            </div>

            <p className="mt-3 text-base text-gray-400 sm:mx-auto sm:mt-5 sm:max-w-xl sm:text-lg md:mt-5 md:text-xl lg:mx-0">
              {recipe?.description}
            </p>
            <p className="font-bold text-cyan-600">
              <span className="text-sm text-gray-400">Prep</span>{" "}
              {recipe?.prep_time?.time}
              {recipe?.prep_time?.unit}
            </p>
            <p className="font-bold text-cyan-600">
              <span className="text-sm text-gray-400">Cook</span>{" "}
              {recipe?.cook_time?.time}
              {recipe?.cook_time?.unit}
            </p>
            <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
              <Link href={`/profile/${recipe?.user_id}`}>
                <a className="flex items-center rounded-md border border-transparent px-8 py-3 text-base font-medium text-cyan-500 hover:text-cyan-600 sm:justify-center md:py-4 md:px-10 md:text-lg lg:justify-start">
                  <div className="flex items-center gap-2">
                    <img
                      className="h-10 w-10 rounded-full"
                      src={recipe?.user.image as string}
                    />
                    <span>{recipe?.user.name}</span>
                  </div>
                </a>
              </Link>

              <div className="mt-3 sm:mt-0 sm:ml-3">
                {/* <a
                  href="#"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-100 px-8 py-3 text-base font-medium text-cyan-700 hover:bg-indigo-200 md:py-4 md:px-10 md:text-lg"
                >
                  Like Recipe?
                </a> */}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
