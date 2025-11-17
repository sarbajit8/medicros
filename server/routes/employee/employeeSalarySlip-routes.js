const express = require("express");
const multer = require("multer");
const path = require("path");
const {
  addSalarySlip,
  getAllSalerySlipByEmployee,
  deleteSalarySlip,
  editSalarySlip,
  downloadSalarySlip,
} = require("../../controllers/employee/employeeSalarySlip-controller");

const router = express.Router();

// ✅ Multer Storage Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads"); // ensure this folder exists
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, uniqueSuffix + ext);
  },
});

// ✅ File Filter to allow only PDFs
const fileFilter = function (req, file, cb) {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"), false);
  }
};

// ✅ Multer Instance
const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // Max 5MB
  },
});




// ✅ Route: Add Salary Slip (PDF Upload)
router.post("/add", upload.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  addSalarySlip(req, res, next);
});


// ✅ Route: Get All Slips by Employee ID
router.get("/list/:employeeId", getAllSalerySlipByEmployee);

// ✅ Route: Edit Salary Slip (with optional new PDF upload)
router.put("/edit/:id", upload.single("image"), (req, res, next) => {
  if (req.file) {
    req.body.image = `/uploads/${req.file.filename}`;
  }
  editSalarySlip(req, res, next);
});


router.get("/download/:filename", downloadSalarySlip);

// ✅ Route: Delete Salary Slip
router.delete("/delete/:id", deleteSalarySlip);

module.exports = router;
