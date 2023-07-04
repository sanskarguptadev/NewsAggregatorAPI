const preferencesRoute = require('express').Router();
const fs = require('fs');
var Users = require("../user.json");
const bodyParser = require('body-parser');
const path = require('path');
const validator = require('../helper/authValidator');

preferencesRoute.use(bodyParser.urlencoded({ extended: true }));
preferencesRoute.use(bodyParser.json());

preferencesRoute.get('/', (req, res) => {
    res.status(200).send({
        preferences: req.user[0].preferences
    });
});

preferencesRoute.put('/', (req, res) => {
    let newPreference = req.body.preference;
    let index = Users.findIndex(user => req.user[0].id === user.id);
    if(validator.validatePreferences(newPreference).status) {
        Users[index].preferences = newPreference;
        console.log(Users);
        let wrPath = path.join(__dirname, '..', 'user.json');
        fs.writeFileSync(wrPath, JSON.stringify(Users), {encoding: 'utf8', flag: 'w'});
        res.status(200).send({
            fullName: Users[index].fullName,
            preferences: Users[index].preferences,
            mail: Users[index].email,
        });
    } else {
        res.status(500).send(validator.validatePreferences(newPreference));
    }
});

module.exports = preferencesRoute;