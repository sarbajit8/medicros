const Student = require("../../models/Student");

const addStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({ success: true, data: student });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const fetchAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: students });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const updateStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updated) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: updated });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

const deleteStudent = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Student.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, message: "Student deleted" });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Toggle showAdmitCard or showCertificate
const toggleVisibility = async (req, res) => {
  try {
    const { id } = req.params;
    const { field } = req.body; // "showAdmitCard" | "showCertificate"
    if (!["showAdmitCard", "showCertificate"].includes(field)) {
      return res.status(400).json({ success: false, message: "Invalid field" });
    }
    const student = await Student.findById(id);
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    student[field] = !student[field];
    await student.save();
    res.status(200).json({ success: true, data: student });
  } catch (e) {
    console.log(e);
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

// Public: lookup by enrollment number (no auth needed)
const getStudentByEnrollment = async (req, res) => {
  try {
    const { enrollmentNumber } = req.params;
    const student = await Student.findOne({ enrollmentNumber });
    if (!student) return res.status(404).json({ success: false, message: "Student not found" });
    res.status(200).json({ success: true, data: student });
  } catch (e) {
    res.status(500).json({ success: false, message: "Error occurred" });
  }
};

module.exports = {
  addStudent, fetchAllStudents, updateStudent, deleteStudent,
  toggleVisibility, getStudentByEnrollment,
};
