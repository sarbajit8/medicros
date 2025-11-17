const express = require("express");
const multer = require("multer");
const path = require("path");

const {
  addLegal,
  getLegalByEmployee,
  editLegal,
  deleteLegal,
  downloadLegal,
} = require("../../controllers/admin/legal-controller");

const router = express.Router();

// ✅ Multer Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public/uploads");
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, unique + ext);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") cb(null, true);
  else cb(new Error("Only PDF files allowed"), false);
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 },
});

// ✅ Routes

router.post("/add", upload.single("image"), (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  addLegal(req, res);
});

router.get("/list/:employeeId", getLegalByEmployee);

router.put("/edit/:id", upload.single("image"), (req, res) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  editLegal(req, res);
});

router.delete("/delete/:id", deleteLegal);

router.get("/download/:filename", downloadLegal);

module.exports = router;
