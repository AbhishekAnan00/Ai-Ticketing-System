// import express from "express";
// import multer from "multer";
// import path from "path";

// const router = express.Router();

// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, path.join(process.cwd(), "uploads"));
//     },
//     filename: (req, file, cb) => {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });
  
//   const upload = multer({ storage });
  
//   router.post("/upload", upload.single("file"), (req, res) => {
//     if (!req.file) {
//       return res.status(400).json({ message: "No file uploaded." });
//     }
//     res.status(200).json({
//       message: "File uploaded successfully",
//       file: req.file,
//     });
//   });

//   export default router