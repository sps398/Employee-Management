const tokenService = require('../services/tokenservice');
const Employee = require('../models/employee');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                email: req.body.email
            }
        });

        if (!employee)
            return res.status(404).json({ message: 'Error 404 : Employee not Found!', success: false });

        const isValidPassword = employee.password === req.body.password;

        if (!isValidPassword) return res.status(401).json({ message: "Error 401 (Unauthorized) : Incorrect Password!", success: false });

        return res.status(200).json({
            message: "User login succesfull!", success: true,
            token: tokenService.generateAccessToken({ employeeId: employee.id, name: employee.name, email: employee.email, role: 'employee' })
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some error occurred!", success: false });
    }
}

const getDetails = async (req, res) => {
    try {
        const employee = await Employee.findOne({
            where: {
                id: req.params.employeeId
            },
            attributes: {
                exclude: ['password', `${(!req.admin) ? 'last_logged_in' : ''}`]
            }
        });
        return res.status(200).json({ success: true, message: 'Successfully retrieved all Employees!', employee: employee});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

const getImageUrl = async (req, res) => {
    try {
        const employeeImageUrl = await Employee.findOne({ where: { id: req.params.employeeId } });
        return res.status(200).json({ success: true, message: 'Successfully retrieved employee image url!'});
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

module.exports = {
    login,
    getDetails,
    getImageUrl
}