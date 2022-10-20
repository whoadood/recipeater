// src/server/trpc/router/_app.ts
import { router } from "../trpc";
import { exampleRouter } from "./example";
import { authRouter } from "./auth";
import { profileRouter } from "./profile";
import { recipeRouter } from "./recipe";
import { categoryRouter } from "./category";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  profile: profileRouter,
  recipe: recipeRouter,
  category: categoryRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
