const Warning = require("../../models/Warning");

// ✅ Add Warning
const addWarning = async (req, res) => {
  try {
    const { title, content, employeeId, date } = req.body;

    if (!title || !content || !employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "All fields (title, content, employeeId, date) are required.",
      });
    }

    const newWarning = new Warning({
      title,
      content,
      employeeId,
      date,
    });

    await newWarning.save();

    res.status(201).json({
      success: true,
      data: newWarning,
    });
  } catch (e) {
    console.error("Error in addWarning:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while adding warning.",
    });
  }
};

// ✅ Get All Warnings for a Specific Employee
const getWarningsByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const warnings = await Warning.find({ employeeId }).sort({ date: -1 });

    res.status(200).json({
      success: true,
      data: warnings,
    });
  } catch (e) {
    console.error("Error in getWarningsByEmployee:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while fetching warnings.",
    });
  }
};

// ✅ Update Warning
const updateWarning = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, date } = req.body;

    const updatedWarning = await Warning.findByIdAndUpdate(
      id,
      { title, content, date },
      { new: true }
    );

    if (!updatedWarning) {
      return res.status(404).json({
        success: false,
        message: "Warning not found.",
      });
    }

    res.status(200).json({
      success: true,
      data: updatedWarning,
    });
  } catch (e) {
    console.error("Error in updateWarning:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while updating warning.",
    });
  }
};

// ✅ Delete Warning
const deleteWarning = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Warning.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Warning not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Warning deleted successfully.",
    });
  } catch (e) {
    console.error("Error in deleteWarning:", e);
    res.status(500).json({
      success: false,
      message: "Error occurred while deleting warning.",
    });
  }
};

module.exports = {
  addWarning,
  getWarningsByEmployee,
  updateWarning,
  deleteWarning,
};
