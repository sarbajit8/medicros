const express = require('express');
const { addOrUpdateAlertByAdmin, markAlertAsReadByEmployee, getAlertByUserId, deleteAlertById } = require('../../controllers/admin/alert-controller');
const router = express.Router();

// Admin Route
router.post('/add', addOrUpdateAlertByAdmin);

// Employee Route
router.put('/update/:userid', markAlertAsReadByEmployee);

//fetch route
router.get('/fetch/:userid', getAlertByUserId);
router.delete('/delete/:id', deleteAlertById);


module.exports = router;  
