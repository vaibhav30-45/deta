// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const ext = path.extname(file.originalname).toLowerCase();
//   if (ext !== ".pdf" && ext !== ".doc" && ext !== ".docx") {
//     return cb(new Error("Only PDF, DOC, DOCX files are allowed"), false);
//   }
//   cb(null, true);
// };

// const upload = multer({ storage, fileFilter });

// export default upload;
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";
import path from "path";


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "detagenix-resumes",
    resource_type: "raw",
    allowed_formats: ["pdf", "doc", "docx"],
    use_filename: true,
    unique_filename: false,
  },
});


const fileFilter = (req, file, cb) => {

  const ext = path.extname(file.originalname).toLowerCase();

  if (
    ext !== ".pdf" &&
    ext !== ".doc" &&
    ext !== ".docx"
  ) {
    return cb(
      new Error("Only PDF DOC DOCX allowed"),
      false
    );
  }

  cb(null, true);
};


const upload = multer({
  storage,
  fileFilter,
});

export default upload;