const express = require("express");
const {
  addStudent, fetchAllStudents, updateStudent, deleteStudent,
  toggleVisibility, getStudentByEnrollment,
} = require("../../controllers/admin/student-controller");

const router = express.Router();

router.post("/add", addStudent);
router.get("/get", fetchAllStudents);
router.put("/update/:id", updateStudent);
router.delete("/delete/:id", deleteStudent);
router.patch("/toggle/:id", toggleVisibility);
router.get("/public/:enrollmentNumber", getStudentByEnrollment);

module.exports = router;
