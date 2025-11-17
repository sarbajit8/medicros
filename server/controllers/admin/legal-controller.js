const Legal = require("../../models/Legal");
const path = require("path");
const fs = require("fs");

// ✅ Add Legal PDF
const addLegal = async (req, res) => {
  try {
    const { title, employeeId, date } = req.body;
    const image = req.body.image || null;

    if (!title || !employeeId || !date || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, employeeId, date, image) are required.",
      });
    }

    const newDoc = new Legal({ title, employeeId, date, image });
    await newDoc.save();

    res.status(201).json({ success: true, data: newDoc });
  } catch (e) {
    console.error("Error in addLegal:", e);
    res.status(500).json({ success: false, message: "Error adding legal document." });
  }
};

// ✅ Get All Legal Docs for Employee
const getLegalByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const docs = await Legal.find({ employeeId }).sort({ date: -1 });
    res.status(200).json({ success: true, data: docs });
  } catch (e) {
    console.error("Error in getLegalByEmployee:", e);
    res.status(500).json({ success: false, message: "Error fetching legal documents." });
  }
};

// ✅ Edit Legal Doc
const editLegal = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, employeeId, date } = req.body;
    const image = req.body.image || null;

    const doc = await Legal.findById(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Legal document not found." });
    }

    doc.title = title || doc.title;
    doc.employeeId = employeeId || doc.employeeId;
    doc.date = date || doc.date;
    doc.image = image || doc.image;

    await doc.save();

    res.status(200).json({ success: true, data: doc });
  } catch (e) {
    console.error("Error in editLegal:", e);
    res.status(500).json({ success: false, message: "Error editing legal document." });
  }
};

// ✅ Delete Legal Doc
const deleteLegal = async (req, res) => {
  try {
    const { id } = req.params;

    const doc = await Legal.findByIdAndDelete(id);
    if (!doc) {
      return res.status(404).json({ success: false, message: "Legal document not found." });
    }

    // Delete PDF file
    const filePath = path.join(__dirname, "../../public", doc.image);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    res.status(200).json({ success: true, message: "Legal document deleted." });
  } catch (e) {
    console.error("Error in deleteLegal:", e);
    res.status(500).json({ success: false, message: "Error deleting legal document." });
  }
};

// ✅ Download Legal Doc
const downloadLegal = async (req, res) => {
  try {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "../../public/uploads", filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found." });
    }

    res.download(filePath);
  } catch (error) {
    console.error("Error in downloadLegal:", error);
    res.status(500).json({ success: false, message: "Download failed." });
  }
};

module.exports = {
  addLegal,
  getLegalByEmployee,
  editLegal,
  deleteLegal,
  downloadLegal,
};
