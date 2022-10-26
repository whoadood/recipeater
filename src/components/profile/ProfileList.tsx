// Packages
import React, { useEffect, useReducer, useState } from "react";
import { Menu } from "@headlessui/react";
import { BarsArrowUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import ProfileRecipeCard from "./ProfileRecipeCard";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";
import { IRecipeCard, IRecipeData, ReducerRecipe } from "../../types/globals";
import { useDarkmode } from "../../hooks/useDark";
import useToggle from "../../hooks/useToggle";
import { recipeReducer } from "../../hooks/recipeReducer";

// const projects = [
//   {
//     name: "Workcation",
//     href: "#",
//     siteHref: "/recipe/aaaaa111111",
//     repoHref: "#",
//     repo: "debbielewis/workcation",
//     tech: "Laravel",
//     lastDeploy: "3h ago",
//     location: "United states",
//     starred: true,
//     active: true,
//   },
//   // More projects...
// ];

export default function ProfileList({
  data,
}: {
  data: inferProcedureOutput<AppRouter["profile"]["getProfileById"]>;
}) {
  const { darkmode, addClasses } = useDarkmode();
  const { toggle, handleToggle } = useToggle();
  const { profile } = data;

  const [recipes, recipeDispatch] = useReducer(recipeReducer, {
    sort: "ASC",
    rec: profile.recipes,
  });

  return (
    <>
      {/* Projects List */}
      <div className="lg:min-w-0 lg:flex-1">
        <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
          <div className="flex items-center">
            <h2 className="flex flex-1 gap-8 text-lg font-medium">
              <div
                onClick={handleToggle}
                className={`${
                  toggle ? "text-gray-400" : ""
                } hover:cursor-pointer`}
              >
                My Recipes
              </div>
              <div
                onClick={handleToggle}
                className={`${
                  toggle ? "" : "text-gray-400"
                } hover:cursor-pointer`}
              >
                Favorite Recipes
              </div>
            </h2>
            <Menu as="div" className={`relative`}>
              <Menu.Button
                className={`inline-flex w-full justify-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium shadow-sm ${
                  darkmode
                    ? "bg-[#2e2e2e] text-white hover:bg-[#1e1e1e]"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                } focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2`}
              >
                <BarsArrowUpIcon
                  className="mr-3 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
                Sort
                <ChevronDownIcon
                  className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </Menu.Button>
              <Menu.Items
                className={`${
                  darkmode
                    ? "bg-[#2e2e2e] text-white hover:bg-[#1e1e1e]"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }} absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md border-2 border-gray-400 shadow-lg `}
              >
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={(e) => {
                          recipeDispatch({ type: "TITLE" });
                          console.log("on click", recipes);
                        }}
                        className={`${
                          darkmode ? "hover:bg-black/70" : "hover:bg-gray-100"
                        } w-full px-4 py-2 text-start text-sm text-inherit`}
                      >
                        Title
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => recipeDispatch({ type: "CATEGORY" })}
                        className={`${
                          darkmode ? "hover:bg-black/70" : "hover:bg-gray-100"
                        } w-full px-4 py-2 text-start text-sm text-inherit`}
                      >
                        Category
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => recipeDispatch({ type: "COMMENT" })}
                        className={`${
                          darkmode ? "hover:bg-black/70" : "hover:bg-gray-100"
                        } w-full px-4 py-2 text-start text-sm text-inherit`}
                      >
                        Comments
                      </button>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        onClick={() => recipeDispatch({ type: "FAVORITE" })}
                        className={`${
                          darkmode ? "hover:bg-black/70" : "hover:bg-gray-100"
                        } w-full px-4 py-2 text-start text-sm text-inherit`}
                      >
                        Favorites
                      </button>
                    )}
                  </Menu.Item>
                  {/* <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={`${
                          darkmode ? "hover:bg-black/70" : "hover:bg-gray-100"
                        } block px-4 py-2 text-sm text-inherit`}
                      >
                        Date created
                      </a>
                    )}
                  </Menu.Item> */}
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-gray-200"
        >
          {!toggle
            ? recipes.rec.map((recipe) => (
                <ProfileRecipeCard
                  recipe={recipe as IRecipeData}
                  key={recipe.id}
                />
              ))
            : profile.favorites.map((fav) => (
                <ProfileRecipeCard
                  recipe={fav.recipe as IRecipeData}
                  key={fav.recipe.id}
                />
              ))}
        </ul>
      </div>
    </>
  );
}
