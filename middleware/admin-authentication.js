const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
require('dotenv').config();

module.exports.authenticate = async (req, res, next) => {
    try {
        const token = req.get('Authorization');
        const payload = jwt.verify(token, process.env.PRIVATE_KEY);
        const admin = await Admin.findByPk(payload.adminId);
        if(!admin)
            return res.status(404).json({ message: "Admin Not found!", success: false });
        req.admin = admin;
        next();
    } catch(err) {
        return res.status(401).json({ message: "Unauthorized", success: false });
    }
};