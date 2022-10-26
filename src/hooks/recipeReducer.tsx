// Packages
import React, { useReducer } from "react";

// Types
import { ReducerRecipe } from "../types/globals";

type Action = {
  type: "TITLE" | "CATEGORY" | "COMMENT" | "FAVORITE";
  value?: undefined;
};

export const recipeReducer = (state: ReducerRecipe[], action: Action) => {
  switch (action.type) {
    case "TITLE": {
      const titleSort = [...state];
      return titleSort.sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
    }
    case "CATEGORY": {
      const catSort = [...state];
      return catSort.sort((a, b) =>
        a.category.name > b.category.name
          ? 1
          : b.category.name > a.category.name
          ? -1
          : 0
      );
    }
    case "COMMENT": {
      const commentSort = [...state];
      return commentSort.sort((a, b) =>
        a.comments.length > b.comments.length
          ? 1
          : b.comments.length > a.comments.length
          ? -1
          : 0
      );
    }
    case "FAVORITE": {
      const favSort = [...state];
      return favSort.sort((a, b) =>
        a.favorites.length > b.favorites.length
          ? 1
          : b.favorites.length > a.favorites.length
          ? -1
          : 0
      );
    }
    default:
      return state;
  }
};
