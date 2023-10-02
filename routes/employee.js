const express = require('express');
const router = express.Router();

const employeeController = require('../controllers/employee');

router.post('/login', employeeController.login);

router.get('/details/:employeeId', employeeController.getDetails);

router.get('/image/::employeeId', employeeController.getImageUrl);

module.exports = router;