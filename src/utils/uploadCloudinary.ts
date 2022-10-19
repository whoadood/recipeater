import { env } from "../env/client.mjs";

export const uploadCloudinary = async (
  fileList: File[],
  signature: string,
  timestamp: number
) => {
  const upload = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", env.NEXT_PUBLIC_API_KEY);
    formData.append("signature", signature);
    formData.append("timestamp", `${timestamp}`);

    const cloudinaryResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );
    return cloudinaryResponse.json();
  };

  return await Promise.all(fileList.map((file) => upload(file)));
};
