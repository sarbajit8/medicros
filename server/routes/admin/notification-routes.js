const express = require("express");
const { addNotification, getAllNotifications, deleteNotification, markAllAsRead } = require("../../controllers/admin/notification-controller");
const router = express.Router();


// Route to add a new notification
router.post("/add", addNotification);

// Route to get all notifications
router.get("/get", getAllNotifications);

// Route to delete a notification by ID
router.delete("/delete/:id", deleteNotification);

router.put("/mark-all-read", markAllAsRead);

module.exports = router;