import { Category, Cook_time, Prep_time, Recipe } from "@prisma/client";

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
