const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const fs = require('fs');

const adminRoutes = require('./routes/admin');
const employeeRoutes = require('./routes/employee');

app.use(bodyParser.json({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.redirect('/src/home.html');
})

app.use('/admin', adminRoutes);
app.use('/employee', employeeRoutes);

app.use((req, res, next) => {
    const filePath = path.join(__dirname, `public/${req.url}`);
    if(!fs.existsSync(filePath))
        next();
    else
        res.status(200).sendFile(filePath);
});

sequelize
    .sync()
    .then(result => {
        console.log('Connected to db...');
        const port = process.env.PORT || 3000;
        app.listen(port, () => {
            console.log('Listening at port', port);
        })
    })  