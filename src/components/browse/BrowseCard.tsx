// Packages
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

// Utils
import { IRecipeCard } from "../../types/globals";
import Link from "next/link";
import { makeImageUrl } from "../../utils/makeImageUrl";
import { useDarkmode } from "../../hooks/useDark";

type question = {
  id: string;
  likes: string;
  replies: string;
  views: string;
  author: {
    name: string;
    imageUrl: string;
    href: string;
  };
  date: string;
  datetime: string;
  href: string;
  title: string;
  body: string;
};

export default function BrowseCard({ recipe }: { recipe: IRecipeCard }) {
  const { justFont, darkmode } = useDarkmode();
  return (
    <li
      className={`${
        darkmode ? "bg-black/40" : "bg-gray-100"
      } relative mx-auto max-w-2xl overflow-hidden shadow sm:rounded-lg`}
    >
      <article aria-labelledby={"recipe-title-" + recipe.id}>
        <div>
          {/* ********** Author section  ********** */}
          <div className="flex space-x-3 px-4 py-6 pb-4 sm:p-6">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src={recipe.user.image!}
                alt=""
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                <Link href={`/profile/${recipe.user.id}`}>
                  <a className="hover:underline">{recipe.user.name}</a>
                </Link>
              </p>
              <p className="text-sm text-gray-400">
                <a
                  href={`/recipe/search/${recipe.category.name}`}
                  className="hover:underline"
                >
                  {recipe.category.name}
                </a>
              </p>
            </div>
            <div className="flex flex-shrink-0 self-center">
              <div className="relative inline-block text-left">
                <div>
                  {/* ********** favorite this recipe ********** */}
                  <Link href={`/recipe/edit/${recipe.id}`}>
                    <a
                      // onClick={() => {}}
                      className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                    >
                      <span className="sr-only">Open options</span>
                      <StarIcon className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div
            style={{
              backgroundImage: `url('${makeImageUrl(recipe.images[0])}')`,
            }}
            className="h-64 w-full bg-cover bg-center bg-no-repeat"
          />
          <div className="px-4 pt-4 sm:px-6">
            <h2
              id={"question-title-" + recipe.id}
              className={`${justFont()}mt-4 text-base font-medium`}
            >
              <Link href={`/recipe/${recipe.id}`}>
                <a className="hover:underline">{recipe.title}</a>
              </Link>
            </h2>
          </div>
          <div
            className={`${justFont()} mt-2 space-y-4 px-4 text-sm  sm:px-6`}
            dangerouslySetInnerHTML={{ __html: recipe.description }}
          />
          <div className=" flex justify-between space-x-8 px-4 py-6 pb-4 sm:p-6">
            <div className="flex space-x-6">
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                  <span className={`font-medium ${justFont()}`}>{11}</span>
                  <span className="sr-only">likes</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ChatBubbleLeftEllipsisIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className={`font-medium ${justFont()}`}>{23}</span>
                  <span className="sr-only">replies</span>
                </button>
              </span>
              <span className="inline-flex items-center text-sm">
                <button
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  <span className={`font-medium ${justFont()}`}>{44}</span>
                  <span className="sr-only">views</span>
                </button>
              </span>
            </div>
            <div className="flex text-sm">
              <span className="inline-flex items-center text-sm">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20recipe%20%23${recipe.title
                    .split(" ")
                    .join("")}%20www.recipeater.com/recipe/${recipe.id}`}
                  target="_blank"
                  rel="noreferrer"
                  type="button"
                  className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                >
                  <ShareIcon className="h-5 w-5" aria-hidden="true" />
                  <span className={`font-medium ${justFont()}`}>Share</span>
                </a>
              </span>
            </div>
          </div>
        </div>
      </article>
    </li>
  );
}
