const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const Employee = require('../models/employee');
require('dotenv').config();

authenticateAdmin = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        const admin = await Admin.findOne({ where: { email: payload.email } });
        if(!admin)
            return res.status(404).json({ message: "Admin Not found!", success: false });
        req.admin = admin;
        next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};

authenticateEmployee = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        const employee = await Employee.findOne({ where: { email: payload.email } });
        if(!employee)
            return res.status(404).json({ message: "Employee Not found!", success: false });
        req.employee = employee;
        next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};

module.exports = {
    authenticateAdmin,
    authenticateEmployee
}