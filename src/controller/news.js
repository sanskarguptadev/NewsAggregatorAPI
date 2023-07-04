const newsRoute = require('express').Router();
var Users = require("../user.json");
const bodyParser = require('body-parser');
const validator = require('../helper/authValidator');
const axios = require('axios');
require('dotenv').config();

newsRoute.use(bodyParser.urlencoded({ extended: true }));
newsRoute.use(bodyParser.json());

newsRoute.get('/', async (req, res) => {
    const preference = req.user[0].preferences;
    const preferenceString = preference.length > 1 ? preference.map(item => item.charAt(0).toUpperCase() + item.slice(1)).join('%20OR%20') : preference;
    let newsResults = await axios.get(`${process.env.BASE_URL}q=${preferenceString}&lang=en&country=ind&min=100&apikey=${process.env.API_KEY}`);
    res.status(200).send(newsResults.data);
});


module.exports = newsRoute;