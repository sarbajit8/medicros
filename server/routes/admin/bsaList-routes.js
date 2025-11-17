const express = require("express");
const { upsertBsaDailyLog, getBsaDailyLogByDate } = require("../../controllers/admin/bsaList-controller");
const router = express.Router();


// POST or UPDATE BSA Daily Log
router.post("/upsert", upsertBsaDailyLog);

// GET BSA Daily Log by employeeId and date
router.get("/by-date", getBsaDailyLogByDate);

module.exports = router;
