const express = require('express');
const { body, validationResult } = require('express-validator');
const isAuth = require('../../middleware/isAuth');
const userController = require('../../controller/userController');

const route = express.Router();

// url: http://localhost:5000/api/users
// method: POST
// desc: Create new user
// Public
route.post('/',
    [
        body('name', 'Name is reauired').notEmpty(), 
        body('email', 'Email is reauired').isEmail(), 
        body('password', 'Password must be with at least 6 characters').isLength({ min: 6 })
    ], 
    userController.postUser);

// url: http://localhost:5000/api/users/remove
// method: DELETE
// desc: Delete user and profile
// Private
route.delete('/remove', isAuth, userController.deleteUser);

module.exports = route;