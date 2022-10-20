// Packages
import React from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";

// Utils
import { Ingredient } from "@prisma/client";

const projects = [
  {
    name: "Graph API",
    initials: "GA",
    href: "#",
    members: 16,
    bgColor: "bg-pink-600",
  },
  {
    name: "Component Design",
    initials: "CD",
    href: "#",
    members: 12,
    bgColor: "bg-purple-600",
  },
  {
    name: "Templates",
    initials: "T",
    href: "#",
    members: 16,
    bgColor: "bg-yellow-500",
  },
  {
    name: "React Components",
    initials: "RC",
    href: "#",
    members: 8,
    bgColor: "bg-green-500",
  },
];

export default function IngredientList({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  return (
    <div>
      <h2 className="text-sm font-medium text-gray-500">Ingredients</h2>
      <ul
        role="list"
        className="mt-3 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4"
      >
        {ingredients.map((ing) => (
          <li key={ing.id} className="col-span-1 flex rounded-md shadow-sm">
            <div
              className={
                "flex w-16 flex-shrink-0 flex-col items-center justify-center rounded-l-md bg-cyan-500 text-sm font-medium text-white"
              }
            >
              <span className="text-xl">{ing.amount}</span>
              <span className="text-gray-500">{ing.unit}</span>
            </div>
            <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-t border-r border-b border-gray-200 bg-white">
              <div className="flex-1 truncate px-4 py-2 text-sm">
                <div className="font-medium text-gray-900 hover:text-gray-600">
                  {ing.name}
                </div>
                <p className="text-gray-500">{ing.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
