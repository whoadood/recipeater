// Packages
import React from "react";
import { ScaleIcon } from "@heroicons/react/24/outline";
// Components
import RecipePreviewCard from "./RecipePreviewCard";

// utils
const cards = [
  { name: "Account balance", href: "#", icon: ScaleIcon, amount: "$30,659.45" },
  // More items...
];

export default function RecipePreviewList() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
      <h2 className="text-lg font-medium leading-6 text-gray-900">
        Recent Activity
      </h2>
      <div className="mt-2 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {/* Card */}
        {cards.map((card) => (
          <RecipePreviewCard key={card.name} card={card} />
        ))}
      </div>
    </div>
  );
}
