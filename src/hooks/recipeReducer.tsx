// Packages
import React, { useReducer } from "react";

// Types
import { ReducerRecipe } from "../types/globals";

type Action = {
  type: "TITLE" | "CATEGORY";
  value?: undefined;
};

export const recipeReducer = (state: ReducerRecipe[], action: Action) => {
  switch (action.type) {
    case "TITLE": {
      return state.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    }
    case "CATEGORY": {
      return state.sort((a, b) =>
        a.category.name > b.category.name
          ? 1
          : b.category.name > a.category.name
          ? -1
          : 0
      );
    }
    default:
      return state;
  }
};
