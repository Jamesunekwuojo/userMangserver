import {v2 as cloudinary} from 'cloudinary';
import dotenv from "dotenv";

dotenv.config()


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


export const uploadToCloudinary = async (image) => {
  try {
    if (!image) throw new Error("No image provided for upload");

    const result = await cloudinary.uploader.upload(image, {
      folder: "newsImg",
      resource_type: "auto", // Supports image or Base64
    });

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};
