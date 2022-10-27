// Packages
import React, { useReducer } from "react";

// Types
import { ReducerRecipe } from "../types/globals";

export type Action = {
  type: "TITLE" | "CATEGORY" | "COMMENT" | "FAVORITE";
  value?: undefined;
};

export type State = {
  sort: string;
  rec: ReducerRecipe[];
};

export const recipeReducer = (state: State, action: Action) => {
  switch (action.type) {
    case "TITLE": {
      const titleSort = [...state.rec].sort((a, b) =>
        a.title > b.title ? 1 : b.title > a.title ? -1 : 0
      );
      if (state.sort === "ASC") {
        return {
          sort: "DESC",
          rec: titleSort,
        };
      } else {
        return {
          sort: "ASC",
          rec: titleSort.reverse(),
        };
      }
    }
    case "CATEGORY": {
      const catSort = [...state.rec].sort((a, b) =>
        a.category.name > b.category.name
          ? 1
          : b.category.name > a.category.name
          ? -1
          : 0
      );
      if (state.sort === "ASC") {
        return {
          sort: "DESC",
          rec: catSort,
        };
      } else {
        return {
          sort: "ASC",
          rec: catSort.reverse(),
        };
      }
    }
    case "COMMENT": {
      const commentSort = [...state.rec].sort(
        (a, b) => b.comments.length - a.comments.length
      );
      if (state.sort === "ASC") {
        return {
          sort: "DESC",
          rec: commentSort,
        };
      } else {
        return {
          sort: "ASC",
          rec: commentSort.reverse(),
        };
      }
    }
    case "FAVORITE": {
      const favSort = [...state.rec].sort(
        (a, b) => b.favorites.length - a.favorites.length
      );
      if (state.sort === "ASC") {
        return {
          sort: "DESC",
          rec: favSort,
        };
      } else {
        return {
          sort: "ASC",
          rec: favSort.reverse(),
        };
      }
    }
    default:
      return state;
  }
};
