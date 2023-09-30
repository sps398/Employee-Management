const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');

router.get('/details', employeeController.getDetails);

router.get('/image', employeeController.getImageUrl);

module.exports = router;