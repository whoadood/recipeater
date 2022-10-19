import { env } from "../env/client.mjs";

export const uploadCloudinary = async (
  fileList: File[],
  signature: string,
  timestamp: number
) => {
  if (!fileList) return [];
  const upload = async (
    file: File
  ): Promise<{
    name: string;
    public_id: string;
    version: number;
    signature: string;
  }> => {
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
    const imageData = await cloudinaryResponse.json();
    return {
      name: file.name,
      public_id: imageData.public_id,
      version: imageData.version,
      signature: imageData.signature,
    };
  };

  return await Promise.all(fileList.map((file) => upload(file)));
};
