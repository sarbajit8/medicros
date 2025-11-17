const ManagerDailyLog = require("../../models/ManagerList");

// Add or update log by employeeId and date
const upsertManagerDailyLog = async (req, res) => {
  try {
    const {
      employeeId,
      date,
      startkm,
      endkm,
      startimg,
      endimg,
      starttime,
      endtime,
      pricePerKm,
      fuel,
      lunch,
      totalamount,
      market,
    } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0); // Normalize date to match exactly

    // Find existing log for the same employee and date
    const existingLog = await ManagerDailyLog.findOne({
      employeeId,
      date: logDate,
    });

    const logData = {
      employeeId,
      date: logDate,
      startkm,
      endkm,
      startimg,
      endimg,
      starttime,
      endtime,
      pricePerKm,
      fuel,
      lunch,
      totalamount,
      market,
    };

    let result;
    if (existingLog) {
      // Update existing log
      result = await ManagerDailyLog.findByIdAndUpdate(
        existingLog._id,
        logData,
        { new: true }
      );
    } else {
      // Create new log
      const newLog = new ManagerDailyLog(logData);
      result = await newLog.save();
    }

    res.status(200).json({
      success: true,
      message: existingLog ? "Log updated successfully" : "Log created successfully",
      data: result,
    });
  } catch (error) {
    console.error("Error in upsertManagerDailyLog:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const getManagerDailyLog = async (req, res) => {
    try {
      const { employeeId, date } = req.query;
  
      if (!employeeId || !date) {
        return res.status(400).json({
          success: false,
          message: "employeeId and date are required.",
        });
      }
  
      const logDate = new Date(date);
      logDate.setHours(0, 0, 0, 0); // Normalize to match exact date
  
      const log = await ManagerDailyLog.findOne({
        employeeId,
        date: logDate,
      });
  
      if (!log) {
        return res.status(404).json({
          success: false,
          message: "No log found for the given employee and date.",
        });
      }
  
      res.status(200).json({
        success: true,
        data: log,
      });
    } catch (error) {
      console.error("Error fetching ManagerDailyLog:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
        error: error.message,
      });
    }
  };

module.exports = {
  upsertManagerDailyLog,
  getManagerDailyLog
};
