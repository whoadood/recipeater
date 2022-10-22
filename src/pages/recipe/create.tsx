// Packages
import React from "react";

// Components
import RecipeForm from "../../components/recipe/createForm/CreateRecipeForm";

export default function create() {
  return (
    <main className="max-h-[90vh] overflow-scroll px-2 py-4">
      <RecipeForm />
    </main>
  );
}
