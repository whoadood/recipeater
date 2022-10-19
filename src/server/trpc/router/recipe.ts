// Packages
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../../env/server.mjs";

export const recipeRouter = router({
  hello: publicProcedure
    .input(z.object({ text: z.string().nullish() }).nullish())
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),

  getSignature: protectedProcedure.mutation(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }),

  createRecipe: protectedProcedure
    .input(
      z.object({
        id: z.string().nullable(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
        difficulty: z.string(),
        yield: z.number(),
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
            public_id: z.string(),
            version: z.number(),
            signature: z.string(),
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
            text: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      console.log("server input", input);
      // const newRecipe = ctx.prisma.recipe.create({
      // 	data: {

      // 	}
      // })
      return input;
    }),
});
