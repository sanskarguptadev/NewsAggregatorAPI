const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('express').Router();
require('dotenv').config();
const registrationRoutes = require("./controller/register");
const loginRoutes = require("./controller/login");
const verifyToken = require("./middleware/verifyToken");
const preferencesRoute = require("./controller/preferences");
const newsRoute = require("./controller/news");

const app = express();
app.use(cors());
app.use(routes);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

routes.get('/', (req, res)=>{
    res.status(200).send("Welcome to the AirTribe Assignment 2");
});

routes.use('/register', registrationRoutes);
routes.use('/login', loginRoutes);
routes.use('/preferences', verifyToken, preferencesRoute);
routes.use('/news', verifyToken, newsRoute);

app.listen(process.env.PORT, (err) => {
    if(err) {
        console.log('Error Occurred', err);
    } else {
        console.log('Server is running successfully', process.env.PORT);
    }
})