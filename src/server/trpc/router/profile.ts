import { router, publicProcedure, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const profileRouter = router({
  getProfileById: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const profile = await ctx.prisma.user.findFirst({
        where: {
          id: input.id,
        },
        include: {
          profile: true,
          recipes: {
            include: {
              category: true,
              prep_time: true,
              cook_time: true,
            },
          },
        },
      });

      const mostCategory = await ctx.prisma.recipe.groupBy({
        where: {
          user_id: input.id,
        },
        by: ["category_id"],
        orderBy: {
          _count: {
            category_id: "desc",
          },
        },
        _count: {
          category_id: true,
        },
        take: 1,
      });

      if (!profile) throw new TRPCError({ code: "NOT_FOUND" });
      return { profile, mostCategory: mostCategory[0] };
    }),

  editBio: protectedProcedure
    .input(z.object({ bio: z.string().min(1).max(140) }))
    .mutation(async ({ input, ctx }) => {
      const updatedProfile = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          profile: {
            upsert: {
              create: {
                bio: input.bio,
              },
              update: {
                bio: input.bio,
              },
            },
          },
        },
      });

      if (!updatedProfile) throw new TRPCError({ code: "NOT_FOUND" });
      return updatedProfile;
    }),
});
