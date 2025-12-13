import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { v4 as uuidv4 } from 'uuid';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Storage definition for complaint photos
const complaintStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "cleanstreet/complaints",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `complaint_${uuidv4()}`,
      transformation: [{ width: 1024, height: 1024, crop: "limit", quality: "auto" }],
      format: "webp", 
    };
  },
});

export const uploadComplaintPhoto = multer({ storage: complaintStorage });

// Storage definition for profile photos
const ProfilePhotoStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "cleanstreet/users",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `user_${req.user?._id || "anonymous"}_${Date.now()}`,
      transformation: [{ width: 512, height: 512, crop: "limit", quality: "auto" }],
      format: "webp", 
    };
  },
});

export const uploadProfilePhoto = multer({ storage: ProfilePhotoStorage });

const commentImageStorage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "cleanstreet/comments",
      allowed_formats: ["jpg", "jpeg", "png", "webp"],
      public_id: `complaint_${req.user?._id || "anonymous"}_${Date.now()}`,
      transformation: [{ width: 1024, height: 1024, crop: "limit", quality: "auto" }],
      format: "webp", 
    };
  },
});

export const uploadCommentImage = multer({ storage: commentImageStorage });
