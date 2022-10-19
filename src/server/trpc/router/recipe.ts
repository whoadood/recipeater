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

  getSignature: protectedProcedure.query(() => {
    const timestamp = Math.round(new Date().getTime() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      { timestamp: timestamp },
      env.CLOUDINARY_API_SECRET
    );
    return { timestamp, signature };
  }),
});
