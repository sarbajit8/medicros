const BsaDailyLog = require("../../models/Bsalist");

// Add or Update BSA Daily Log
const upsertBsaDailyLog = async (req, res) => {
  try {
    const { employeeId, date, lunch, market } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const updatedLog = await BsaDailyLog.findOneAndUpdate(
      { employeeId, date: logDate },
      { lunch, market },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "BSA Daily Log saved successfully.",
      data: updatedLog,
    });
  } catch (error) {
    console.error("Error in upsertBsaDailyLog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get BSA Daily Log by Employee and Date
const getBsaDailyLogByDate = async (req, res) => {
  try {
    const { employeeId, date } = req.query;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const log = await BsaDailyLog.findOne({ employeeId, date: logDate });

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    console.error("Error in getBsaDailyLogByDate:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  upsertBsaDailyLog,
  getBsaDailyLogByDate,
};
