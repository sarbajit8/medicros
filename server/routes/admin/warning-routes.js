const express = require("express");
const { addWarning, getWarningsByEmployee, updateWarning, deleteWarning } = require("../../controllers/admin/warning-controller");


const router = express.Router();

router.post("/add", addWarning);
router.get("/list/:employeeId", getWarningsByEmployee);
router.put("/edit/:id", updateWarning);
router.delete("/delete/:id", deleteWarning);

module.exports = router;
