// Packages
import React, { Reducer } from "react";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import {
  ChatBubbleLeftEllipsisIcon,
  EllipsisVerticalIcon,
  EyeIcon,
  HandThumbUpIcon,
  ShareIcon,
} from "@heroicons/react/20/solid";
import { trpc } from "../../utils/trpc";
import { useSession } from "next-auth/react";
import Image from "next/image";

// Hooks
import { useDarkmode } from "../../hooks/useDark";

// Utils
import { IRecipeCard, ReducerRecipe } from "../../types/globals";
import { makeImageUrl } from "../../utils/makeImageUrl";

// type question = {
//   id: string;
//   likes: string;
//   replies: string;
//   views: string;
//   author: {
//     name: string;
//     imageUrl: string;
//     href: string;
//   };
//   date: string;
//   datetime: string;
//   href: string;
//   title: string;
//   body: string;
// };

export default function BrowseCard({ recipe }: { recipe: ReducerRecipe }) {
  const { justFont, darkmode } = useDarkmode();
  const utils = trpc.useContext();
  const { data: session } = useSession();
  const favoriteMutation = trpc.recipe.addFavorite.useMutation({
    onSuccess() {
      utils.recipe.getHomePage.invalidate();
      utils.recipe.getRecipeById.invalidate();
      utils.recipe.getRecipesBySearch.invalidate();
    },
  });
  const unFavoriteMutation = trpc.recipe.removeFavorite.useMutation({
    onSuccess() {
      utils.recipe.getHomePage.invalidate();
      utils.recipe.getRecipeById.invalidate();
      utils.recipe.getRecipesBySearch.invalidate();
    },
  });

  return (
    <div
      className={`${
        darkmode ? "bg-black/40" : "bg-gray-100"
      } relative mx-auto w-full max-w-2xl flex-shrink flex-grow overflow-hidden shadow sm:rounded-lg lg:w-auto`}
    >
      <article aria-labelledby={"recipe-title-" + recipe.id}>
        <div>
          {/* ********** Author section  ********** */}
          <div className="flex space-x-3 px-4 py-6 pb-4 sm:p-6">
            <div className="flex-shrink-0">
              <div className="relative h-10 w-10">
                <Image
                  className="rounded-full"
                  layout="fill"
                  src={recipe?.user?.image as string}
                  alt="user avatar"
                />
              </div>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                <Link href={`/profile/${recipe?.user?.id}`}>
                  <a className="hover:underline">{recipe?.user?.name}</a>
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
            {session && (
              <div className="flex flex-shrink-0 self-center">
                <div className="relative inline-block text-left">
                  <div>
                    {/* ********** edit this recipe ********** */}
                    <Link href={`/recipe/edit/${recipe.id}`}>
                      <a className="-m-2 flex items-center rounded-full p-2 text-gray-400 hover:text-gray-500">
                        <span className="sr-only">Edit recipe</span>
                        <EllipsisVerticalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </a>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>
          {recipe.images && (
            <div className="relative flex h-64 w-full overflow-hidden">
              <Image
                layout="fill"
                src={makeImageUrl(recipe.images[0]) as string}
                alt="recipe photo"
                className="mx-auto object-cover"
                sizes="(max-width: 1200px) 720px, (max-width: 768px) 480px"
              />
            </div>
          )}
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
                {session ? (
                  <button
                    onClick={() => {
                      if (
                        !recipe.favorites.find(
                          (fav) => fav.userId === session?.user?.id
                        )
                      ) {
                        favoriteMutation.mutate({
                          recipeId: recipe.id,
                        });
                      } else {
                        unFavoriteMutation.mutate({
                          id: recipe?.favorites.filter(
                            (fav) => fav.userId === session.user?.id
                          )[0]?.id as string,
                        });
                      }
                    }}
                    type="button"
                    className="inline-flex space-x-2 text-gray-400 hover:text-gray-500"
                  >
                    <HandThumbUpIcon
                      className={`h-5 w-5 ${
                        recipe.favorites.find(
                          (fav) => fav.userId === session?.user?.id
                        )
                          ? "text-cyan-500 hover:text-cyan-600"
                          : ""
                      }`}
                      aria-hidden="true"
                    />
                    <span className={`font-medium ${justFont()}`}>
                      {recipe.favorites.length}
                    </span>
                    <span className="sr-only">likes</span>
                  </button>
                ) : (
                  <div className="inline-flex space-x-2 text-gray-400 hover:text-gray-500">
                    <HandThumbUpIcon className="h-5 w-5" aria-hidden="true" />
                    <span className={`font-medium ${justFont()}`}>
                      {recipe.favorites.length}
                    </span>
                    <span className="sr-only">likes</span>
                  </div>
                )}
              </span>
              <span className="inline-flex items-center text-sm">
                <div className="inline-flex space-x-2 text-gray-400">
                  <ChatBubbleLeftEllipsisIcon
                    className="h-5 w-5"
                    aria-hidden="true"
                  />
                  <span className={`font-medium ${justFont()}`}>
                    {recipe.comments.length}
                  </span>
                  <span className="sr-only">replies</span>
                </div>
              </span>
              <span className="inline-flex items-center text-sm">
                <div className="inline-flex space-x-2 text-gray-400">
                  <EyeIcon className="h-5 w-5" aria-hidden="true" />
                  <span className={`font-medium ${justFont()}`}>
                    {recipe.views}
                  </span>
                  <span className="sr-only">views</span>
                </div>
              </span>
            </div>
            <div className="flex text-sm">
              <span className="inline-flex items-center text-sm">
                <a
                  href={`https://twitter.com/intent/tweet?text=Check%20out%20my%20new%20recipe%20%23${recipe.title
                    .split(" ")
                    .join("")}%20www.recipeater.vercel.app/recipe/${recipe.id}`}
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
    </div>
  );
}
