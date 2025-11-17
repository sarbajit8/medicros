const express = require("express");
const { upsertPaymentRemarks, getPaymentRemarksByEmployeeAndDate } = require("../../controllers/admin/paymentRemarks-controller");
const router = express.Router();


// POST or UPDATE - Upsert payment remarks by employeeId and date
router.post("/upsert", upsertPaymentRemarks);
router.get("/get-remarks", getPaymentRemarksByEmployeeAndDate);

module.exports = router;
