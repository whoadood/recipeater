import z from "zod";

export const BioSchema = z.object({
  bio: z.string().min(1).max(140),
});
