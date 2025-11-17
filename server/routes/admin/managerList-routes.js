const express = require("express");
const { upsertManagerDailyLog, getManagerDailyLog } = require("../../controllers/admin/managerList-controller");
const router = express.Router();



router.post("/upsert", upsertManagerDailyLog);

// GET: Fetch log by employeeId and date
router.get("/get-log", getManagerDailyLog);

module.exports = router;

