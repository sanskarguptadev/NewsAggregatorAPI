const jwt = require("jsonwebtoken");
var Users = require("../user.json");
require('dotenv').config();

const verifyToken = (req, res, next) => {
    if (req.headers && req.headers.authorization && req.headers.authorization.split(' ')[0] === 'JWT') {
        jwt.verify(req.headers.authorization.split(' ')[1], process.env.API_SECRET, function (err, decode) {
          if (err)  {
            req.user = undefined;
            next();
          }
          const userDetails = Users.filter(user =>  user.id === decode?.id);
          if(userDetails.length > 0) {
            req.user = userDetails;
            next()
          } else {
            res.status(500)
            .send({
              message: 'Invalid Token'
            });
          }
        });
    } else {
        req.user = undefined;
        req.message = "Authorization header not found";
        next();
    }
}

module.exports = verifyToken;