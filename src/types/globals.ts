import {
  Category,
  Cook_time,
  Image,
  Ingredient,
  Prep_time,
  Recipe,
  User,
} from "@prisma/client";
import { Direction } from "readline";

export type NavItem = {
  name: string;
  href: string;
  icon: (
    props: React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  current?: boolean;
};

export type CardProps = {
  name: string;
  href: string;
  icon: (
    props: React.SVGProps<SVGSVGElement> & {
      title?: string | undefined;
      titleId?: string | undefined;
    }
  ) => JSX.Element;
  amount: string;
};

export type RecipeData = Recipe & {
  category: Category;
  prep_time: Prep_time;
  cook_time: Cook_time;
};

export type IRecipeData = Recipe & {
  user: User;
  prep_time: Prep_time;
  category: Category;
  cook_time: Cook_time;
  ingredients: Ingredient[];
  directions: Direction[];
  images: Image[];
};
