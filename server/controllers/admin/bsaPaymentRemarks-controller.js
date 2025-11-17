const BsaPaymentRemarks = require("../../models/BsaPaymentRemarks");

// Add or Update BSA Payment Remarks
const upsertPaymentRemarks = async (req, res) => {
  try {
    const {
      employeeId,
      date,
      accounremarks,
      accountamount,
      casshremarks,
      qrremarks,
      btremarks,
      msremarks,
      ppremarks,
      cpremarks,
      chequestatus,
    } = req.body;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    // Normalize date to start of day
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    // Try to find existing record
    let existing = await BsaPaymentRemarks.findOne({ employeeId, date: logDate });

    if (existing) {
      // Update existing record
      existing.accounremarks = accounremarks || existing.accounremarks;
      existing.accountamount = accountamount || existing.accountamount;
      existing.casshremarks = casshremarks || existing.casshremarks;
      existing.qrremarks = qrremarks || existing.qrremarks;
      existing.btremarks = btremarks || existing.btremarks;
      existing.msremarks = msremarks || existing.msremarks;
      existing.ppremarks = ppremarks || existing.ppremarks;
      existing.cpremarks = cpremarks || existing.cpremarks;
      existing.chequestatus = chequestatus || existing.chequestatus;

      await existing.save();

      return res.status(200).json({
        success: true,
        message: "BSA payment remarks updated successfully.",
        data: existing,
      });
    } else {
      // Create new record
      const newRemarks = new BsaPaymentRemarks({
        employeeId,
        date: logDate,
        accounremarks,
        accountamount,
        casshremarks,
        qrremarks,
        btremarks,
        msremarks,
        ppremarks,
        cpremarks,
        chequestatus,
      });

      await newRemarks.save();

      return res.status(201).json({
        success: true,
        message: "BSA payment remarks created successfully.",
        data: newRemarks,
      });
    }
  } catch (error) {
    console.error("Error in upsertPaymentRemarks:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Get BSA Payment Remarks by employeeId and date
const getPaymentRemarksByEmployeeAndDate = async (req, res) => {
  try {
    const { employeeId, date } = req.query;

    if (!employeeId || !date) {
      return res.status(400).json({
        success: false,
        message: "employeeId and date are required.",
      });
    }

    // Normalize date to start of day
    const logDate = new Date(date);
    logDate.setHours(0, 0, 0, 0);

    const data = await BsaPaymentRemarks.findOne({ employeeId, date: logDate });

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "No BSA payment remarks found for the given employee and date.",
      });
    }

    return res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error("Error in getPaymentRemarksByEmployeeAndDate:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

module.exports = {
  upsertPaymentRemarks,
  getPaymentRemarksByEmployeeAndDate,
};
