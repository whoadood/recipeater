// Packages
import React from "react";
import {
  ChatBubbleLeftEllipsisIcon,
  ChevronRightIcon,
  EyeIcon,
  HandThumbUpIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import Link from "next/link";
import { RecipeData, IRecipeCard, IRecipeData } from "../../types/globals";
import { useDarkmode } from "../../hooks/useDark";
import { makeImageUrl } from "../../utils/makeImageUrl";

export default function ProfileRecipeCard({ recipe }: { recipe: IRecipeData }) {
  const { darkmode } = useDarkmode();
  return (
    <li
      key={recipe.id}
      className={`relative py-5 pl-4 pr-6 ${
        darkmode ? "hover:bg-black/50" : "hover:bg-gray-50"
      } sm:py-6 sm:pl-6 lg:pl-8 xl:pl-6`}
    >
      <div className="flex items-center justify-between space-x-4">
        {/* Repo name and link */}
        <div className="flex min-w-0 items-center gap-4">
          <div className="max-h-14 w-14">
            {recipe.images && <img src={makeImageUrl(recipe.images[0])} />}
          </div>
          <div>
            <h2 className="text-sm font-medium">{recipe.title}</h2>

            <div className="group relative flex items-center space-x-2.5">
              <span className="truncate text-sm font-medium text-gray-400">
                {recipe.category.name}
              </span>
            </div>
          </div>
        </div>
        <Link href={`/recipe/${recipe.id}`}>
          <a className="p-4 sm:hidden">
            <ChevronRightIcon
              className="h-5 w-5 text-cyan-400"
              aria-hidden="true"
            />
          </a>
        </Link>

        {/* Repo meta info */}
        <div className="hidden flex-shrink-0 flex-col items-end space-y-3 sm:flex">
          <p className="flex items-center space-x-4">
            <Link href={`/recipe/${recipe.id}`}>
              <a className="relative text-sm font-medium text-cyan-400 hover:text-cyan-500">
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
          <p className="font-base flex space-x-2 text-sm text-gray-400">
            <div className="inline-flex space-x-2 text-gray-400">
              <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
              <span className={`font-medium `}>{recipe.favorites.length}</span>
              <span className="sr-only">views</span>
            </div>
            <span aria-hidden="true">&middot;</span>
            <div className="inline-flex space-x-2 text-gray-400">
              <ChatBubbleLeftEllipsisIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
              <span className={`font-medium `}>{recipe.comments.length}</span>
              <span className="sr-only">views</span>
            </div>
            <span aria-hidden="true">&middot;</span>
            <div className="inline-flex space-x-2 text-gray-400">
              <EyeIcon className="h-5 w-5" aria-hidden="true" />
              <span className={`font-medium `}>{recipe.views}</span>
              <span className="sr-only">views</span>
            </div>
            <span aria-hidden="true">&middot;</span>
            <span>{recipe.difficulty}</span>
          </p>
        </div>
      </div>
    </li>
  );
}
