const LeaveApplication = require("../../models/LeaveApplication");


const addEmployeeLeave = async (req, res) => {
  try {
    const {
        employeeName,
        employeeId,
        employeePan,
        title,
        application,
        leaveStatus,
        date,
    } = req.body;

    const newlyCreatedLeaveApplication = new LeaveApplication({
        employeeName,
        employeeId,
        employeePan,
        title,
        application,
        leaveStatus,
        date,
    });

    await newlyCreatedLeaveApplication.save();
    res.status(201).json({
      success: true,
      data: newlyCreatedLeaveApplication,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};


const getAllLeaveByEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const leaves = await LeaveApplication.find({ employeeId });

    if (!leaves.length) {
      return res.status(404).json({
        success: false,
        message: "No leave found!",
        data:"newuse"
      });
    }

    res.status(200).json({
      success: true,
      data: leaves,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const fetchAllEmployeeLeaves = async (req, res) => {
  try {
    const listOfLeaves = await LeaveApplication.find({});
    res.status(200).json({
      success: true,
      data: listOfLeaves,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};

const editLeave = async (req, res) => {
  try {
    const { id } = req.params;
    const {
        employeeName,
        employeeId,
        employeePan,
        title,
        application,
        leaveStatus,
        date,
    } = req.body;

    let findLeave = await LeaveApplication.findById(id);
    if (!findLeave)
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
      findLeave.employeeName = employeeName || findLeave.employeeName;
      findLeave.employeeId = employeeId || findLeave.employeeId;
      findLeave.employeePan = employeePan || findLeave.employeePan;
      findLeave.title = title || findLeave.title;
      findLeave.quantity = application || findLeave.application;
      findLeave.category = leaveStatus || findLeave.leaveStatus;
      findLeave.brand = date || findLeave.date;
    await findLeave.save();
    res.status(200).json({
      success: true,
      data: findLeave,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Error occured",
    });
  }
};



const updateLeaveApplicationStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { leaveStatus } = req.body;

    const order = await LeaveApplication.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    await LeaveApplication.findByIdAndUpdate(id, { leaveStatus });

    res.status(200).json({
      success: true,
      message: "Leave status is updated successfully!",
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};


const updateLeaveReplyById = async (req, res) => {
  try {
    const { id } = req.params; // Get Leave ID from request params
    const { reply } = req.body; // Get reply from request body

    // Find the leave application by Leave ID
    const leaveApplication = await LeaveApplication.findById(id);

    if (!leaveApplication) {
      return res.status(404).json({
        success: false,
        message: "Leave application not found!",
      });
    }

    // Update the reply field
    leaveApplication.reply = reply || leaveApplication.reply;
    await leaveApplication.save();

    res.status(200).json({
      success: true,
      message: "Leave reply updated successfully!",
      data: leaveApplication,
    });
  } catch (error) {
    console.error("Error updating leave reply:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while updating leave reply.",
    });
  }
};



module.exports = {
    addEmployeeLeave,
    getAllLeaveByEmployee,
    fetchAllEmployeeLeaves,
    updateLeaveApplicationStatus,
    editLeave,
    updateLeaveReplyById   
  };
  
