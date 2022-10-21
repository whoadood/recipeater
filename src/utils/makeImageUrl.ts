import { Image } from "@prisma/client";
import { env } from "../env/client.mjs";

export const makeImageUrl = (image?: Image) => {
  if (image)
    return `https://res.cloudinary.com/${env.NEXT_PUBLIC_CLOUD_NAME}/image/upload/v${image.version}/${image.public_id}`;
};
