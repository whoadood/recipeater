// Packages
import React from "react";
import { Menu } from "@headlessui/react";
import { BarsArrowUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import ProfileRecipeCard from "./ProfileRecipeCard";
import { inferProcedureOutput } from "@trpc/server";
import { AppRouter } from "../../server/trpc/router/_app";
const projects = [
  {
    name: "Workcation",
    href: "#",
    siteHref: "/recipe/aaaaa111111",
    repoHref: "#",
    repo: "debbielewis/workcation",
    tech: "Laravel",
    lastDeploy: "3h ago",
    location: "United states",
    starred: true,
    active: true,
  },
  // More projects...
];

export default function ProfileList({
  data,
}: {
  data: inferProcedureOutput<AppRouter["profile"]["getProfileById"]>;
}) {
  const {
    profile: { recipes },
  } = data;
  return (
    <>
      {/* Projects List */}
      <div className="bg-white lg:min-w-0 lg:flex-1">
        <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
          <div className="flex items-center">
            <h1 className="flex-1 text-lg font-medium">My Recipes</h1>
            <Menu as="div" className="relative">
              <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1">
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Name
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Date modified
                      </a>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ active }) => (
                      <a
                        href="#"
                        className={classNames(
                          active
                            ? "bg-gray-100 text-gray-900"
                            : "text-gray-700",
                          "block px-4 py-2 text-sm"
                        )}
                      >
                        Date created
                      </a>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Menu>
          </div>
        </div>

        <ul
          role="list"
          className="divide-y divide-gray-200 border-b border-gray-200"
        >
          {recipes.map((recipe) => (
            <ProfileRecipeCard recipe={recipe} key={recipe.id} />
          ))}
        </ul>
      </div>
    </>
  );
}
