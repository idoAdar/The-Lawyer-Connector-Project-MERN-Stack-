const express = require('express');
const { body, validationResult } = require('express-validator');
const isAuth = require('../../middleware/isAuth');
const authController = require('../../controller/authController');

const route = express.Router();

// url: http://localhost:5000/api/auth
// method: GET
// desc: fetch specific user
// Private
route.get('/', isAuth, authController.getAuth);

// url: http://localhost:5000/api/auth
// method: POST
// desc: login user
// Public
route.post('/',
    [
        body('email', 'Email is reauired').isEmail(), 
        body('password', 'Password must be with at least 6 characters').isLength({ min: 6 })
    ],
    authController.postLogin);

module.exports = route;