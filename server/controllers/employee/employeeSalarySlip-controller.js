const SalarySlip = require("../../models/SalarySlip");
const path = require("path");
const fs = require("fs");
// ✅ Add Salary Slip
const addSalarySlip = async (req, res) => {
  try {
    const { title, employeeId, date } = req.body;
    const image = req.body.image || null;

    if (!title || !employeeId || !date || !image) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, employeeId, date, image) are required.",
      });
    }

    const newSlip = new SalarySlip({
      title,
      employeeId,
      date,
      image,
    });

    await newSlip.save();

    res.status(201).json({
      success: true,
      data: newSlip,
    });
  } catch (e) {
    console.error("Error in addSalarySlip:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding salary slip.",
    });
  }
};

// ✅ Get All Slips for a Specific Employee
const getAllSalerySlipByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const slips = await SalarySlip.find({ employeeId }).sort({ date: -1 });

    if (!slips.length) {
      return res.status(404).json({
        success: false,
        message: "No salary slips found for this employee.",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      data: slips,
    });
  } catch (e) {
    console.error("Error in getAllSalerySlipByEmployee:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching salary slips.",
    });
  }
};

// ✅ Edit Salary Slip
const editSalarySlip = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, employeeId, date } = req.body;
    const image = req.body.image || null;

    const slip = await SalarySlip.findById(id);

    if (!slip) {
      return res.status(404).json({
        success: false,
        message: "Salary slip not found.",
      });
    }

    slip.title = title || slip.title;
    slip.employeeId = employeeId || slip.employeeId;
    slip.date = date || slip.date;
    slip.image = image || slip.image;

    await slip.save();

    res.status(200).json({
      success: true,
      data: slip,
    });
  } catch (e) {
    console.error("Error in editSalarySlip:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while editing salary slip.",
    });
  }
};

// ✅ Delete Salary Slip
const deleteSalarySlip = async (req, res) => {
  try {
    const { id } = req.params;

    const slip = await SalarySlip.findByIdAndDelete(id);

    if (!slip) {
      return res.status(404).json({
        success: false,
        message: "Salary slip not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Salary slip deleted successfully.",
    });
  } catch (e) {
    console.error("Error in deleteSalarySlip:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting salary slip.",
    });
  }
};

const downloadSalarySlip = async (req, res) => {
  try {
    const { filename } = req.params;

    const filePath = path.join(__dirname, "../../public/uploads", filename);

    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "File not found" });
    }

    res.download(filePath); // triggers browser download
  } catch (error) {
    console.error("Error in downloadSalarySlip:", error);
    res.status(500).json({ success: false, message: "Download failed" });
  }
};

module.exports = {
  addSalarySlip,
  getAllSalerySlipByEmployee,
  editSalarySlip,
  deleteSalarySlip,
  downloadSalarySlip
};
