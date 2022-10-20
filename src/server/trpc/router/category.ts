import { router, publicProcedure } from "../trpc";
import { z } from "zod";

export const categoryRouter = router({
  getTopCategory: publicProcedure.query(async ({ ctx }) => {
    const categories = await ctx.prisma.category.findMany({
      select: {
        id: true,
        name: true,
        recipes: true,
        _count: true,
      },
      orderBy: {
        recipes: {
          _count: "desc",
        },
      },
      take: 8,
    });

    console.log("categorys db", categories);

    return "hello";
  }),
  // getAll: publicProcedure.query(({ ctx }) => {
  //   return ctx.prisma.example.findMany();
  // }),
});
