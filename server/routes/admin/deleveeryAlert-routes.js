const express = require('express');
const { addOrUpdateDeleveryAlert, markDeleveryAlertAsRead, getDeleveryAlertByUserAndType } = require('../../controllers/admin/Deleveryalert-controller');
const router = express.Router();


// POST /api/delivery-alert/add
router.post('/add', addOrUpdateDeleveryAlert);

// PUT /api/delivery-alert/read/:userid/:type
router.put('/read/:userid/:type', markDeleveryAlertAsRead);

// GET /api/delivery-alert/:userid/:type
router.get('/get/:userid/:type', getDeleveryAlertByUserAndType);

module.exports = router;
