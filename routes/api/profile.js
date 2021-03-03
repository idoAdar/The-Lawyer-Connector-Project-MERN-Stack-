const express = require('express');
const profileController = require('../../controller/profileController');
const { body, validationResult } = require('express-validator');
const isAuth = require('../../middleware/isAuth');

const route = express.Router();

// url: http://localhost:5000/api/profile/me
// method: GET
// desc: fetch user profile by token
// Private
route.get('/me', isAuth, profileController.getProfile);

// url: http://localhost:5000/api/profile
// method: POST
// desc: create or update profile by token
// Private
route.post('/',
    [ 
        isAuth,
        [ 
            body('status', 'Status is required').notEmpty(),
            body('skills', 'Skills is required').notEmpty()
        ] 
    ],
    profileController.postProfile);

// url: http://localhost:5000/api/profile/all
// method: GET
// desc: fetch all profiles
// Public
route.get('/all', profileController.getAllProfiles);

// url: http://localhost:5000/api/profile/user/'userId'
// method: GET
// desc: fetch user profile by user id
// Public
route.get('/user/:userId', profileController.getProfileUserById);

// url: http://localhost:5000/api/profile/experience
// method: PUT
// desc: Update user experience
// Private
route.put('/experience', [
        isAuth,
        [
            body('title', 'Title is required').notEmpty(),
            body('company', 'Company is required').notEmpty(),
            body('from', 'From field is required').notEmpty()
        ]
    ],
    profileController.updateExperience);

// url: http://localhost:5000/api/profile/experience-remove/:experienceId
// method: DELETE
// desc: Remove experience
// Private
route.delete('/experience-remove/:experienceId', isAuth, profileController.deleteExperience);

// url: http://localhost:5000/api/profile/education
// method: PUT
// desc: Update user education
// Private
route.put('/education',
    [
        isAuth,
        body('school', 'School is reuired').notEmpty(),
        body('degree', 'Degree is reuired').notEmpty(),
        body('from', 'From field is required').notEmpty()
    ],
    profileController.updateEducation);

// url: http://localhost:5000/api/profile/education/delete/educationId
// method: DELETE
// desc: Remove education
// Private
route.delete('/education/delete/:educationId', isAuth, profileController.deleteEducation);

module.exports = route;