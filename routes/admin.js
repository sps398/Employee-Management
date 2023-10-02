const { upload } = require('../services/storageservice');
const express = require('express');
const router = express.Router();

const authentication = require('../middleware/authentication');
const adminController = require('../controllers/admin');

router.post('/login', adminController.login);

router.post('/add-employee', authentication.authenticateAdmin, upload.single('file'), adminController.insertEmployee);

router.patch('/update-employee/:employeeId', authentication.authenticateAdmin, adminController.updateEmployee);

router.delete('/delete-employee/:employeeId', authentication.authenticateAdmin, adminController.deleteEmployee);

router.get('/all-employees', authentication.authenticateAdmin, adminController.getAllEmployees);

module.exports = router;