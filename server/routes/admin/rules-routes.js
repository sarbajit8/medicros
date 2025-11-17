const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addRule,
  getAllRules,
  editRule,
  deleteRule,
  downloadRule,
} = require("../../controllers/admin/rules-controller");

const router = express.Router();

// ✅ Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads"); // Make sure this path exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
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
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
});

// ✅ Routes

// Add Rule
router.post("/add", upload.single("image"), (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  addRule(req, res);
});

// Get All Rules
router.get("/list", getAllRules);

// Edit Rule
router.put("/edit/:id", upload.single("image"), (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  editRule(req, res);
});

// Delete Rule
router.delete("/delete/:id", deleteRule);

// Download Rule PDF
router.get("/download/:filename", downloadRule);

module.exports = router;
