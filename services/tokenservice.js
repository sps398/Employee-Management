const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateAccessToken = function (user) {
    const token = jwt.sign(user, process.env.PRIVATE_KEY);
    return token;
}

module.exports = {
    generateAccessToken
}