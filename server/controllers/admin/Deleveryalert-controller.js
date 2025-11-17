const DeleveryAlert = require('../../models/DeleveryAlert');

// Add or Update Delivery Alert
const addOrUpdateDeleveryAlert = async (req, res) => {
  try {
    const { username, userid, type } = req.body;

    const existing = await DeleveryAlert.findOne({ userid, type });

    if (existing) {
      existing.username = username;
      existing.status = 'unread';
      await existing.save();
      return res.status(200).json({ message: 'Alert updated successfully', alert: existing });
    }

    const newAlert = new DeleveryAlert({
      username,
      userid,
      type,
      status: 'unread',
    });

    await newAlert.save();
    return res.status(201).json({ message: 'Alert created successfully', alert: newAlert });
  } catch (err) {
    console.error('Add/Update Delivery Alert Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Mark alert as read by userid and type
const markDeleveryAlertAsRead = async (req, res) => {
  try {
    const { userid, type } = req.params;

    const alert = await DeleveryAlert.findOne({ userid, type });
    if (!alert) return res.status(404).json({ error: 'No matching alert found' });

    alert.status = 'read';
    await alert.save();

    return res.status(200).json({ message: 'Alert marked as read', alert });
  } catch (err) {
    console.error('Mark Read Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Get alert by userid and type
const getDeleveryAlertByUserAndType = async (req, res) => {
  try {
    const { userid, type } = req.params;

    const alert = await DeleveryAlert.findOne({ userid, type });

    if (!alert) return res.status(404).json({ message: 'No alert found for this user and type' });

    return res.status(200).json({ alert });
  } catch (err) {
    console.error('Fetch Alert Error:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  addOrUpdateDeleveryAlert,
  markDeleveryAlertAsRead,
  getDeleveryAlertByUserAndType,
};
