const express = require("express");
const multer = require("multer");
const path = require("path");
const { 
  addCareer, 
  getAllCareer, 
  downloadCareerPdf,
  verifyPayment
} = require("../../controllers/shop/career-controller");

const router = express.Router();

// Multer setup for PDF upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname);
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
});

// Routes without middleware
router.post("/add", upload.single("image"), addCareer);
router.get("/list", getAllCareer);
router.get("/download/:filename", downloadCareerPdf);
router.post("/verify-payment", verifyPayment);

module.exports = router;
