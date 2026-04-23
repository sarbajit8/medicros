const mongoose = require("mongoose");

const StudentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    fatherName: String,
    motherName: String,
    dob: String,
    gender: String,
    rollNumber: { type: String, required: true },
    course: String,
    batch: String,
    enrollmentNumber: String,
    email: String,
    phone: String,
    address: String,
    photo: String,
    examCenter: String,
    examDate: String,
    examTime: String,
    grade: String,
    percentage: String,
    passingYear: String,
    showAdmitCard: { type: Boolean, default: false },
    showCertificate: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Student", StudentSchema);
