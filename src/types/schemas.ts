import z from "zod";

export const BioSchema = z.object({
  bio: z.string().min(1).max(140),
});

export const RecipeSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(140),
  category: z.string().min(1).max(30),
  yield: z.number(),
  difficulty: z.string(),
  prep_time: z.object({
    time: z.number(),
    unit: z.string(),
  }),
  cook_time: z.object({
    time: z.number(),
    unit: z.string(),
  }),
  photos: z.array(
    z.object({
      name: z.string(),
      lastModified: z.number(),
      size: z.number(),
      type: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.number(),
      unit: z.string(),
    })
  ),
  directions: z.array(
    z.object({
      step: z.number(),
      text: z.string().min(1).max(140),
    })
  ),
});
