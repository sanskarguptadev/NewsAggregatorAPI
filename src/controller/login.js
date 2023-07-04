const loginRoutes = require('express').Router();
var jwt = require("jsonwebtoken");
var bcrypt = require("bcrypt");
var Users = require("../user.json");
const validator = require('../helper/authValidator');
const bodyParser = require('body-parser');
require('dotenv').config();

loginRoutes.use(bodyParser.urlencoded({ extended: true }));
loginRoutes.use(bodyParser.json());

loginRoutes.post('/', (req, res) => {
    if(validator.validateLoginDetails(req.body).status) {
      const userDetails = Users.filter(user => user.email === req.body.email);
      if(userDetails.length === 1) {
        var passwordIsValid = bcrypt.compare(req.body.password, userDetails[0].password);
        if(passwordIsValid) {
            var token = jwt.sign({ id: userDetails[0].id }, process.env.API_SECRET, { expiresIn: 86400 });
            console.log(userDetails);
            res.status(200)
            .send({
              user: {
                id: userDetails[0].id,
                email: userDetails[0].email,
                fullName: userDetails[0].fullName,
              },
              message: "Login successful",
              accessToken: token,
            });
        } else {
            return res.status(401).send({ accessToken: null, message: "Invalid Password!" });
        }
      } else {
        res.status(400).send('User Not found Please register first.');
      }
    } else {
        res.status(500).json(validator.validateLoginDetails(req.body));
    }
});

module.exports = loginRoutes;