// Packages
import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { v2 as cloudinary } from "cloudinary";
import { env } from "../../../env/server.mjs";
import { TRPCError } from "@trpc/server";

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
        views: true,
        images: true,
        comments: true,
        favorites: true,
      },
      take: 4,
    });
    return featured;
  }),

  addView: publicProcedure
    .input(
      z.object({
        id: z.string(),
        views: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      const addedView = ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          views: input.views + 1,
        },
      });
      if (!addedView) throw new TRPCError({ code: "NOT_FOUND" });
      return addedView;
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
          favorites: true,
          comments: {
            include: {
              user: true,
            },
          },
          images: true,
        },
      });

      return recipe;
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        recipe_id: z.string(),
        comment: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newComment = ctx.prisma.comment.create({
        data: {
          text: input.comment,
          user: {
            connect: { id: ctx.session.user.id },
          },
          recipe: {
            connect: { id: input.recipe_id },
          },
        },
      });
      if (!newComment) throw new TRPCError({ code: "NOT_FOUND" });
      return newComment;
    }),

  addFavorite: protectedProcedure
    .input(
      z.object({
        recipeId: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const newFavorite = await ctx.prisma.favorite.create({
        data: {
          recipe: {
            connect: { id: input.recipeId },
          },
          user: {
            connect: { id: ctx.session.user.id },
          },
        },
      });

      console.log("create fav", newFavorite);
      return newFavorite;
    }),

  removeFavorite: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const delFavorite = await ctx.prisma.favorite.delete({
        where: { id: input.id },
      });

      console.log("delete fav", delFavorite);
      return delFavorite;
    }),

  getSignature: protectedProcedure.mutation(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }),

  getDeleteSignature: protectedProcedure
    .input(
      z.object({
        photo_id: z.string(),
        public_id: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      cloudinary.config({
        cloud_name: env.NEXT_PUBLIC_CLOUD_NAME,
        api_key: env.NEXT_PUBLIC_API_KEY,
        api_secret: env.CLOUDINARY_API_SECRET,
      });

      return cloudinary.uploader.destroy(
        input.public_id,
        async (err: any, result: any) => {
          if (err) {
            console.log("error", err);
            throw new Error((err as Error).message);
          }
          const deleted = await ctx.prisma.image.delete({
            where: {
              id: input.photo_id,
            },
          });
          console.log("result", result);
          return { message: "successfully deleted " + deleted.id };
        }
      );
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
          views: true,
          cook_time: true,
          favorites: true,
          comments: true,
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
        category: z.object({
          id: z.string().nullable(),
          name: z.string(),
        }),
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
          views: 0,
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
                name: input.category.name,
              },
              create: {
                name: input.category.name,
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

  editRecipe: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string(),
        description: z.string(),
        category: z.string(),
        difficulty: z.string(),
        yield: z.number(),
        prep_time: z.object({
          id: z.string().nullable(),
          time: z.number(),
          unit: z.string(),
        }),
        cook_time: z.object({
          id: z.string().nullable(),
          time: z.number(),
          unit: z.string(),
        }),
        photos: z.array(
          z.object({
            id: z.string().nullable(),
            name: z.string(),
            public_id: z.string(),
            version: z.number(),
            signature: z.string(),
          })
        ),
        ingredients: z.array(
          z.object({
            id: z.string().nullable(),
            name: z.string(),
            amount: z.number(),
            unit: z.string(),
          })
        ),
        directions: z.array(
          z.object({
            id: z.string().nullable(),
            step: z.number(),
            text: z.string(),
          })
        ),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const editedRecipe = ctx.prisma.recipe.update({
        where: {
          id: input.id,
        },
        data: {
          title: input.title,
          description: input.description,
          category: {
            connectOrCreate: {
              where: { name: input.category },
              create: { name: input.category },
            },
          },
          difficulty: input.difficulty,
          yield: input.yield,
          prep_time: {
            upsert: {
              create: {
                time: input.prep_time.time,
                unit: input.prep_time.unit,
              },
              update: {
                time: input.prep_time.time,
                unit: input.prep_time.unit,
              },
            },
          },
          cook_time: {
            upsert: {
              create: {
                time: input.cook_time.time,
                unit: input.cook_time.unit,
              },
              update: {
                time: input.cook_time.time,
                unit: input.cook_time.unit,
              },
            },
          },
          images: {
            upsert: input.photos.map((photo) => {
              return {
                create: {
                  name: photo.name,
                  public_id: photo.public_id,
                  version: photo.version,
                  signature: photo.signature,
                },
                update: {
                  name: photo.name,
                  public_id: photo.public_id,
                  version: photo.version,
                  signature: photo.signature,
                },
                where: { id: photo.id ? photo.id : "no id" },
              };
            }),
          },
          ingredients: {
            upsert: input.ingredients.map((ing) => {
              return {
                create: { name: ing.name, amount: ing.amount, unit: ing.unit },
                update: { name: ing.name, amount: ing.amount, unit: ing.unit },
                where: { id: ing.id ? ing.id : "no id" },
              };
            }),
          },
          directions: {
            upsert: input.directions.map((dir) => {
              return {
                create: { step: dir.step, text: dir.text },
                update: { step: dir.step, text: dir.text },
                where: { id: dir.id ? dir.id : "no id" },
              };
            }),
          },
        },
      });
      if (!editedRecipe) throw new TRPCError({ code: "NOT_FOUND" });

      return editedRecipe;
    }),
});
