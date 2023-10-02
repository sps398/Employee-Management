const tokenService = require('../services/tokenservice');
const s3Service = require('../services/s3service');
const Employee = require('../models/employee');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const login = async (req, res) => {
    try {
        const admin = await Admin.findOne({
            where: {
                title: req.body.title
            }
        });

        if (!admin)
            return res.status(404).json({ message: 'Error 404 : Admin not Found!', success: false });

        const isValidPassword = admin.password === req.body.password;

        if (!isValidPassword) return res.status(401).json({ message: "Error 401 (Unauthorized) : Incorrect Password!", success: false });

        return res.status(200).json({
            message: "Admin login succesfull!", success: true,
            token: tokenService.generateAccessToken({ adminId: admin._id, name: admin.name, email: admin.email, role: 'admin' })
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some error occurred!", success: false });
    }
}

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.findAll();
        return res.status(200).json({ success: true, message: 'Successfully retrieved all employees!', employees: employees});
    } catch(err) {
        return res.status(500).json({ message: "Some error occurred!", success: false });
    }
}

const insertEmployee = async (req, res) => {
    try {
        let newEmployee = JSON.parse(req.body.employee);
        const employee = await Employee.findOne({ where: { email: newEmployee.email } });
        if(employee)
            return res.status(400).json({ success: false, message: 'Account already exists!' });

        const file = req.file;
        const fileContent = fs.readFileSync(file.path);
        const s3Response = await s3Service.uploadToS3(fileContent, file.originalname);
        console.log(req.body.employee.name);

        newEmployee = {
            id: uuidv4(),
            ...newEmployee,
            imageUrl: s3Response.Location
        };
        await Employee.create(newEmployee);
        return res.status(200).json({ success: true, message: 'Successfully created Employee!'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

const updateEmployee = async (req, res) => {
    try {
        await Employee.update(req.body, { where: { id: req.params.employeeId } });
        return res.status(200).json({ success: true, message: 'Successfully updated employee details'});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        await Employee.destroy({ where: { id: req.params.employeeId } });
        return res.status(200).json({ success: true, message: 'Successfully deleted Employee!'});
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

module.exports = {
    login,
    getAllEmployees,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}