const { body, validationResult } = require('express-validator');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/default.json').jwtSecret;

const User = require('../models/User');

exports.getAuth = (req, res, next) => {
   User.findById(req.user.id).select('-password')
    .then(user => {
        res.json(user);
    })
    .catch(err => console.error(err));
}

exports.postLogin = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    User.findOne({ email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ errors: [{msg: 'User not found'}] });
            } else {
                bcryptjs.compare(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) {
                            return res.status(400).json({ errors: [{msg: 'Invalid password'}] });
                        } else {
                            const payload = { id: user._id };
                            jwt.sign(payload, jwtSecret, (err, token) => res.json({ token, user }));
                        }
                    })        
            }
        })
        .catch(err => res.status(500).send('Server Error'));
}