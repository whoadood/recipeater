import { router, publicProcedure } from "../trpc";
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
        select: {
          id: true,
          name: true,
          image: true,
          profile: {
            select: {
              bio: true,
            },
          },
          recipes: {
            select: {
              id: true,
              title: true,
              images: true,
              category: true,
            },
          },
        },
      });

      if (!profile) throw new TRPCError({ code: "NOT_FOUND" });
      return profile;
    }),
});
