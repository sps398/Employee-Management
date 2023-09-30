const tokenService = require('../services/tokenservice');
const Employee = require('../models/employee');
const Admin = require('../models/admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { uuid } = require('uuidv4');

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
            token: tokenService.generateAccessToken({ adminId: admin._id, name: admin.name, email: admin.email })
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Some error occurred!", success: false });
    }
}

const insertEmployee = async (req, res) => {
    try {
        const file = req.file;
        const fileContent = fs.readFileSync(file.path);
        const s3Response = await s3Services.uploadToS3(fileContent, file.originalname);

        const newEmployee = {
            id: uuid(),
            ...req.body.employee,
            imageUrl: s3Response.Location
        };
        await Employee.create(newEmployee);
        return res.status(200).json({ success: true, message: 'Successfully created Employee!'});
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

const updateEmployee = async (req, res) => {
    try {
        await Employee.update(req.body.newEmployee, { where: { id: req.params.employeeId } });
        return res.status(200).json({ success: true, message: ''});
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

const deleteEmployee = async (req, res) => {
    try {
        await Employee.destroy({ where: { id: req.params.EmployeeId } });
        return res.status(200).json({ success: true, message: 'Successfully deleted Employee!'});
    } catch(err) {
        return res.status(500).json({ success: false, message: 'Some error occurred!' });
    }
}

module.exports = {
    login,
    insertEmployee,
    updateEmployee,
    deleteEmployee
}