// Packages
import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

// Hooks
import { useDarkmode } from "../../hooks/useDark";

export default function SearchBar() {
  const { darkmode } = useDarkmode();
  return (
    <div className="flex flex-1">
      <form className="flex w-full md:ml-0" action="#" method="GET">
        <label htmlFor="search-field" className="sr-only">
          Search
        </label>
        <div className="relative w-full text-gray-400 focus-within:text-gray-600">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2"
            aria-hidden="true"
          >
            <MagnifyingGlassIcon className="h-5 w-5 " aria-hidden="true" />
          </div>
          <input
            id="search-field"
            name="search-field"
            className={`${
              darkmode ? "text-white" : "text-gray-900"
            } block h-full w-full border-transparent bg-inherit py-2 pl-8 pr-3 placeholder-gray-500 focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm`}
            placeholder="Search transactions"
            type="search"
          />
        </div>
      </form>
    </div>
  );
}
