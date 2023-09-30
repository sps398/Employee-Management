const Sequelize = require('sequelize');
require('dotenv').config();
const SECRETS = process.env;

const sequelize = new Sequelize(SECRETS.DB_NAME, SECRETS.DB_USERNAME, SECRETS.DB_PASS, {
    dialect: SECRETS.DIALECT, host: SECRETS.HOST
});

module.exports = sequelize;