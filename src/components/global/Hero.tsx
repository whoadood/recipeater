// Packages
import React from "react";
import {
  BuildingOfficeIcon,
  CheckCircleIcon,
} from "@heroicons/react/24/outline";
import Button from "./Button";
import { useRouter } from "next/router";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="py-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
      <div className="min-w-0 flex-1">
        {/* Profile */}
        <div className="flex items-center">
          {/* Recipeater icon here */}

          <div>
            <div className="flex items-center">
              <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:leading-9">
                Welcome to <span className="text-cyan-500">Recipeater</span>
              </h1>
            </div>
            <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
              <dt className="sr-only">tagline</dt>
              <dd className="flex items-center text-sm font-medium capitalize text-gray-500 sm:mr-6">
                seemlessly track and revisit all your favorite recipes
              </dd>
            </dl>
          </div>
        </div>
      </div>
      <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
        <Button
          alt={true}
          text="Browse recipes"
          onClick={() =>
            router.push({
              pathname: "/recipe/search/all",
            })
          }
        />
        <Button
          text="Sign up"
          onClick={() =>
            router.push({
              pathname: "/signin",
            })
          }
        />
      </div>
    </div>
  );
}
