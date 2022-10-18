import z from "zod";

export const BioSchema = z.object({
  bio: z.string().min(1).max(140),
});

export const RecipeSchema = z.object({
  title: z.string().min(1).max(60),
  description: z.string().min(1).max(140),
  category: z.string().min(1).max(30),
  photos: z.array(
    z.object({
      lastModified: z.number(),
      name: z.string(),
      size: z.number(),
      type: z.string(),
      webkitRelativePath: z.string(),
    })
  ),
  ingredients: z.array(
    z.object({
      name: z.string(),
      amount: z.string(),
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
