// Packages
import React from "react";
import { ChevronRightIcon, StarIcon } from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import Link from "next/link";

export default function ProfileRecipeCard({ recipe }: { recipe: any }) {
  return (
    <li
      key={recipe.repo}
      className="relative py-5 pl-4 pr-6 hover:bg-gray-50 sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6"
    >
      <div className="flex items-center justify-between space-x-4">
        {/* Repo name and link */}
        <div className="min-w-0 space-y-3">
          <div className="flex items-center space-x-3">
            <span
              className={classNames(
                recipe.active ? "bg-green-100" : "bg-gray-100",
                "flex h-4 w-4 items-center justify-center rounded-full"
              )}
              aria-hidden="true"
            >
              <span
                className={classNames(
                  recipe.active ? "bg-green-400" : "bg-gray-400",
                  "h-2 w-2 rounded-full"
                )}
              />
            </span>

            <h2 className="text-sm font-medium">
              <a href={`/recipe/${recipe.id}`}>
                <span className="absolute inset-0" aria-hidden="true" />
                {recipe.name}{" "}
                <span className="sr-only">
                  {recipe.active ? "Running" : "Not running"}
                </span>
              </a>
            </h2>
          </div>
          <a
            href={`/recipe/${recipe.id}`}
            className="group relative flex items-center space-x-2.5"
          >
            <span className="truncate text-sm font-medium text-gray-500 group-hover:text-gray-900">
              {recipe.title}
            </span>
          </a>
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
            <button
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
            </button>
          </p>
          <p className="flex space-x-2 text-sm text-gray-500">
            <span>{recipe.category.name}</span>
            <span aria-hidden="true">&middot;</span>
            <span>{recipe.difficulty}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
