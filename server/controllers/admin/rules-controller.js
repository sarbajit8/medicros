const Rules = require("../../models/Rules");
const path = require("path");
const fs = require("fs");

// ✅ Add Rule
const addRule = async (req, res) => {
  try {
    const { title, date } = req.body;
    const image = req.body.image;

    if (!title || !date || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, date, image) are required.",
      });
    }

    const newRule = new Rules({ title, date, image });
    await newRule.save();

    res.status(201).json({ success: true, data: newRule });
  } catch (error) {
    console.error("Error in addRule:", error);
    res.status(500).json({ success: false, message: "Failed to add rule." });
  }
};

// ✅ Get All Rules
const getAllRules = async (req, res) => {
  try {
    const rules = await Rules.find().sort({ date: -1 });
    res.status(200).json({ success: true, data: rules });
  } catch (error) {
    console.error("Error in getAllRules:", error);
    res.status(500).json({ success: false, message: "Failed to fetch rules." });
  }
};

// ✅ Edit Rule
const editRule = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, date } = req.body;
    const image = req.body.image;

    const rule = await Rules.findById(id);
    if (!rule) {
      return res.status(404).json({ success: false, message: "Rule not found." });
    }

    rule.title = title || rule.title;
    rule.date = date || rule.date;
    rule.image = image || rule.image;

    await rule.save();
    res.status(200).json({ success: true, data: rule });
  } catch (error) {
    console.error("Error in editRule:", error);
    res.status(500).json({ success: false, message: "Failed to edit rule." });
  }
};

// ✅ Delete Rule
const deleteRule = async (req, res) => {
  try {
    const { id } = req.params;

    const rule = await Rules.findByIdAndDelete(id);
    if (!rule) {
      return res.status(404).json({ success: false, message: "Rule not found." });
    }

    // Delete PDF file
    const filePath = path.join(__dirname, "../../public", rule.image);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ success: true, message: "Rule deleted successfully." });
  } catch (error) {
    console.error("Error in deleteRule:", error);
    res.status(500).json({ success: false, message: "Failed to delete rule." });
  }
};

// ✅ Download Rule PDF
const downloadRule = async (req, res) => {
  try {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "../../public/uploads", filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.download(filePath);
  } catch (error) {
    console.error("Error in downloadRule:", error);
    res.status(500).json({ success: false, message: "Download failed" });
  }
};

module.exports = {
  addRule,
  getAllRules,
  editRule,
  deleteRule,
  downloadRule,
};
