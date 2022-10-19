// Packages
import React from "react";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import Link from "next/link";
import { RecipeData } from "../../types/globals";

export default function ProfileRecipeCard({ recipe }: { recipe: RecipeData }) {
  return (
    <li
      key={recipe.id}
      className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
    >
      <div className="flex items-center justify-between space-x-4">
        {/* Repo name and link */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-center space-x-3">
            <h2 className="text-sm font-medium">
              <div>
                <span className="absolute inset-0" aria-hidden="true" />
                {recipe.title}{" "}
              </div>
            </h2>
          </div>
          <div className="group relative flex items-center space-x-2.5">
            <span className="truncate text-sm font-medium text-gray-500">
              {recipe.category.name}
            </span>
          </div>
        </div>
        <div className="sm:hidden">
          <ChevronRightIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>

        {/* Repo meta info */}
        <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
          <p className="flex items-center space-x-4">
            <Link href={`/recipe/${recipe.id}`}>
              <a className="relative text-sm font-medium text-gray-500 hover:text-gray-900">
                View Recipe
              </a>
            </Link>
            {/* ********** like count ********** */}
            {/* <button
              type="button"
              className="relative rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="sr-only">
                {recipe.starred ? "Add to favorites" : "Remove from favorites"}
              </span>
              <StarIcon
                className={classNames(
                  recipe.starred
                    ? "text-yellow-300 hover:text-yellow-400"
                    : "text-gray-300 hover:text-gray-400",
                  "h-5 w-5"
                )}
                aria-hidden="true"
              />
            </button> */}
          </p>
          <p className="flex space-x-2 text-sm text-gray-500">
            <span>
              prep {recipe.prep_time.time}
              {recipe.prep_time.unit}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>
              cook {recipe.cook_time.time}
              {recipe.cook_time.unit}
            </span>
            <span aria-hidden="true">&middot;</span>
            <span>{recipe.difficulty}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
