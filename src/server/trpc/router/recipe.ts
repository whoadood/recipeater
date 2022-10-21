// Packages
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../../env/server.mjs";

export const recipeRouter = router({
  getHomePage: publicProcedure.query(async ({ ctx }) => {
    const featured = await ctx.prisma.recipe.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        category: true,
        user: true,
        prep_time: true,
        cook_time: true,
        difficulty: true,
        yield: true,
        images: true,
      },
      take: 4,
    });
    return featured;
  }),
  getRecipeById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const recipe = await ctx.prisma.recipe.findFirst({
        where: {
          id: input.id,
        },
        include: {
          user: true,
          category: true,
          directions: true,
          ingredients: true,
          cook_time: true,
          prep_time: true,
          images: true,
        },
      });

      return recipe;
    }),

  getSignature: protectedProcedure.mutation(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }),

  getRecipesBySearch: publicProcedure
    .input(
      z
        .object({
          search: z.string().nullable(),
        })
        .nullable()
    )
    .query(async ({ input, ctx }) => {
      const recipes = await ctx.prisma.recipe.findMany({
        where: {
          OR: [
            {
              title: {
                contains: input?.search || undefined,
              },
            },
            {
              category: {
                name: {
                  contains: input?.search || undefined,
                },
              },
            },
            {
              user: {
                name: {
                  contains: input?.search || undefined,
                },
              },
            },
          ],
        },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          user: true,
          prep_time: true,
          cook_time: true,
          difficulty: true,
          yield: true,
          images: true,
        },
      });

      return { recipes };
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
      const newRecipe = ctx.prisma.recipe.create({
        data: {
          title: input.title,
          description: input.description,
          yield: input.yield,
          prep_time: {
            create: {
              time: input.prep_time.time,
              unit: input.prep_time.unit,
            },
          },
          cook_time: {
            create: {
              time: input.cook_time.time,
              unit: input.cook_time.unit,
            },
          },
          difficulty: input.difficulty,
          images: {
            createMany: {
              data: input.photos,
            },
          },
          ingredients: {
            createMany: {
              data: input.ingredients,
            },
          },
          directions: {
            createMany: {
              data: input.directions,
            },
          },
          category: {
            connectOrCreate: {
              where: {
                name: input.category,
              },
              create: {
                name: input.category,
              },
            },
          },
          user: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
        include: {
          prep_time: true,
          cook_time: true,
          images: true,
          ingredients: true,
          directions: true,
          category: true,
          user: true,
        },
      });

      return newRecipe;
    }),
});
