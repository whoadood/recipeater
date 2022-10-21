// Packages
import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  CodeBracketIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  FlagIcon,
  HandThumbUpIcon,
  ShareIcon,
  StarIcon,
} from "@heroicons/react/20/solid";

// Utils
import { classNames } from "../../utils/classNames";
import { Category, Cook_time, Prep_time, Recipe, User } from "@prisma/client";
import { IRecipeCard } from "../../types/globals";
import Link from "next/link";
import { makeImageUrl } from "../../utils/makeImageUrl";

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
  return (
    <li
      style={{ backgroundImage: `url('${makeImageUrl(recipe.images[0])}')` }}
      className="opacity-1/2 relative mx-auto max-w-2xl overflow-hidden bg-gray-600 bg-cover bg-center bg-no-repeat px-4 py-6 pb-4 text-white bg-blend-overlay shadow sm:rounded-lg sm:p-6"
    >
      <article aria-labelledby={"recipe-title-" + recipe.id}>
        <div>
          {/* ********** Author section  ********** */}
          <div className="flex space-x-3">
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
              <p className="text-sm text-gray-500">
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
                  <button
                    // onClick={() => {}}
                    className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-600"
                  >
                    <span className="sr-only">Open options</span>
                    <StarIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <h2
            id={"question-title-" + recipe.id}
            className="mt-4 text-base font-medium text-gray-900"
          >
            <Link href={`/recipe/${recipe.id}`}>
              <a className="hover:underline">{recipe.title}</a>
            </Link>
          </h2>
        </div>
        <div
          className="mt-2 space-y-4 text-sm text-gray-700"
          dangerouslySetInnerHTML={{ __html: recipe.description }}
        />
        <div className="mt-6 flex justify-between space-x-8">
          <div className="flex space-x-6">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{11}</span>
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
                <span className="font-medium text-gray-900">{23}</span>
                <span className="sr-only">replies</span>
              </button>
            </span>
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <EyeIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">{44}</span>
                <span className="sr-only">views</span>
              </button>
            </span>
          </div>
          <div className="flex text-sm">
            <span className="inline-flex items-center text-sm">
              <button
                type="button"
                className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
              >
                <ShareIcon className="h-5 w-5" aria-hidden="true" />
                <span className="font-medium text-gray-900">Share</span>
              </button>
            </span>
          </div>
        </div>
      </article>
    </li>
  );
}
