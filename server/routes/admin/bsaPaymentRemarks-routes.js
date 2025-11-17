const express = require("express");
const {
  upsertPaymentRemarks,
  getPaymentRemarksByEmployeeAndDate
} = require("../../controllers/admin/bsaPaymentRemarks-controller"); // ✅ Updated import path

const router = express.Router();

// ✅ POST or UPDATE - Upsert BSA payment remarks by employeeId and date
router.post("/upsert", upsertPaymentRemarks);

// ✅ GET - Fetch BSA payment remarks by employeeId and date
router.get("/get-remarks", getPaymentRemarksByEmployeeAndDate);

module.exports = router;
