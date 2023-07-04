const registrationRoutes = require('express').Router();
var bcrypt = require("bcrypt");
var Users = require("../user.json");
const validator = require('../helper/authValidator');
const fs = require('fs');
const bodyParser = require('body-parser');
const path = require('path');

registrationRoutes.use(bodyParser.urlencoded({ extended: true }));
registrationRoutes.use(bodyParser.json());

registrationRoutes.post('/', (req, res) => {
    if(validator.validateRegistrationDetails(req.body).status) {
        let uniqueEmail = Users.length > 0 && Users.filter(user => user.email === req.body.email);
        if(uniqueEmail.length > 0) {
            res.status(400).send("user already exists!");
        } else {
            const user = {
                id: new Date(),
                fullName: req.body.fullName,
                email: req.body.email,
                password: bcrypt.hashSync(req.body.password, 8),
                preferences: req.body.preferences, 
            }
    
            let wrPath = path.join(__dirname, '..', 'user.json');
            let userData = Users;
            userData.push(user);
            fs.writeFileSync(wrPath, JSON.stringify(userData), {encoding: 'utf8', flag: 'w'});
            res.status(200).send("user has been added successfully");
        }
    } else {
        res.status(500).json(validator.validateRegistrationDetails(req.body));
    }
});

module.exports = registrationRoutes;