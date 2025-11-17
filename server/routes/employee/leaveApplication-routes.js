const express = require("express");
const { addEmployeeLeave, fetchAllEmployeeLeaves, getAllLeaveByEmployee, editLeave, updateLeaveApplicationStatus, updateLeaveReplyById } = require("../../controllers/employee/leaveApplication-controller");



const router = express.Router();

router.post("/add", addEmployeeLeave);
router.get("/get", fetchAllEmployeeLeaves);
router.get("/list/:employeeId", getAllLeaveByEmployee);
router.post("/edit/:id", editLeave);
router.put("/update/:id", updateLeaveApplicationStatus);
// ✅ Update leave reply by Leave ID
router.put("/update-reply/:id", updateLeaveReplyById);



module.exports = router;
