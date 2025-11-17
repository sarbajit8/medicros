const Rules = require("../../models/Notification");

// Controller to add a new rule
const addNotification = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Validate required fields
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required fields",
      });
    }

    // Create new rule with default status "unread" and current date
    const newRule = new Rules({
      title,
      description,
      status: "unread", // Default status as requested
      date: new Date(), // Current date as requested
    });

    // Save the rule to database
    const savedRule = await newRule.save();

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Rule added successfully",
      data: savedRule,
    });
  } catch (error) {
    console.error("Error adding rule:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Controller to fetch all rules
const getAllNotifications = async (req, res) => {
  try {
    // Fetch all rules from database
    const rules = await Rules.find().sort({ createdAt: -1 }); // Sort by newest first

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Rules fetched successfully",
      count: rules.length,
      data: rules,
    });
  } catch (error) {
    console.error("Error fetching rules:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

// Controller to delete a rule by ID
const deleteNotification = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Rule ID is required",
      });
    }

    // Find and delete the rule
    const deletedRule = await Rules.findByIdAndDelete(id);

    // Check if rule exists
    if (!deletedRule) {
      return res.status(404).json({
        success: false,
        message: "Rule not found",
      });
    }

    // Return success response
    return res.status(200).json({
      success: true,
      message: "Rule deleted successfully",
      data: deletedRule,
    });
  } catch (error) {
    console.error("Error deleting rule:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};


// Controller to mark all notifications as read
const markAllAsRead = async (req, res) => {
  try {
    // Update all documents where status is 'unread'
    const result = await Rules.updateMany(
      { status: 'unread' }, // filter
      { $set: { status: 'read' } } // update
    );

    return res.status(200).json({
      success: true,
      message: `${result.modifiedCount} notifications marked as read`,
      modifiedCount: result.modifiedCount,
    });
  } catch (error) {
    console.error("Error updating all notifications to read:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};



 

module.exports = {
  addNotification,
  getAllNotifications,
  deleteNotification,
  markAllAsRead

};
