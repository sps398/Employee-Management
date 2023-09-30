const { upload } = require('../services/storageservice');
const express = require('express');
const router = express.Router();

const adminAuthentication = require('../middleware/admin-authentication');
const adminController = require('../controllers/admin');

router.post('/login', adminController.login);

router.post('/insert', adminAuthentication.authenticate, upload.single('file'), adminController.insertEmployee);

router.put('/update/:employeeId', adminAuthentication.authenticate, adminController.updateEmployee);

router.delete('/delete/:employeeId', adminAuthentication.authenticate, adminController.deleteEmployee);

module.exports = router;