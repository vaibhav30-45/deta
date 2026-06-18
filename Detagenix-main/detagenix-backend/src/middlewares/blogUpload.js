import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "detagenix-blogs",
    resource_type: "image",
    allowed_formats: [
      "jpg",
      "jpeg",
      "png",
      "webp"
    ],
  },
});


const fileFilter = (req, file, cb) => {

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    ext !== ".jpg" &&
    ext !== ".jpeg" &&
    ext !== ".png" &&
    ext !== ".webp"
  ) {
    return cb(
      new Error("Only images allowed"),
      false
    );
  }

  cb(null,true);
};


const blogUpload = multer({
  storage,
  fileFilter,
});


export default blogUpload;