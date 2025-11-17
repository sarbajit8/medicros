const Alert = require('../../models/Alert'); // Adjust the path as needed

// ADMIN: Always add a new alert for a specific user
const addOrUpdateAlertByAdmin = async (req, res) => {
  try {
    const { username, userid, type } = req.body;

    // Create and save a new alert (no update logic)
    const newAlert = new Alert({
      username,
      userid,
      type,
      status: 'unread',
    });

    await newAlert.save();

    return res.status(201).json({
      message: "New alert created successfully",
      alert: newAlert,
    });

  } catch (err) {
    console.error("Admin Alert Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

// EMPLOYEE: Mark alert as read
const markAlertAsReadByEmployee = async (req, res) => {
  try {
    const { userid } = req.params;

    const result = await Alert.updateMany({ userid, status: 'unread' }, { status: 'read' });

    return res.status(200).json({
      message: `${result.modifiedCount} alert(s) marked as read`,
    });
  } catch (err) {
    console.error("Employee Alert Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// GET: Fetch alert by user ID
const getAlertByUserId = async (req, res) => {
  try {
    const { userid } = req.params;

    const alert = await Alert.find({ userid }).sort({ createdAt: -1 });

    if (!alert || alert.length === 0) {
      return res.status(404).json({ message: "No alerts found for this user" });
    }

    return res.status(200).json({ alert });
  } catch (err) {
    console.error("Fetch Alert Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};
// DELETE: Delete alert by alert ID
const deleteAlertById = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedAlert = await Alert.findByIdAndDelete(id);

    if (!deletedAlert) {
      return res.status(404).json({ error: "Alert not found" });
    }

    return res.status(200).json({
      message: "Alert deleted successfully",
      alert: deletedAlert,
    });
  } catch (err) {
    console.error("Delete Alert Error:", err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
addOrUpdateAlertByAdmin,
markAlertAsReadByEmployee,
getAlertByUserId,
deleteAlertById

  };
  