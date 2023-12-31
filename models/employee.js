const Sequelize = require('sequelize');
const sequelize = require('../util/database');

const Employee = sequelize.define('employee', {
    id: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false   
    },
    phoneNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    imageUrl: {
        type: Sequelize.STRING,
        allowNull: false
    },
    jobTitle: Sequelize.STRING,
    salary: Sequelize.INTEGER,
    last_logged_in: Sequelize.DATE
})

module.exports = Employee;