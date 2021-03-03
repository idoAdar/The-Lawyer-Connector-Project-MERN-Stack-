const { body, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jwtSecret = require('../config/default.json').jwtSecret;
const User = require('../models/User');
const Profile = require('../models/Profile');

exports.postUser = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;
    
    User.findOne({ email })
        .then(user => {
            if (user) {
                return res.status(400).json({ errors: [{msg: 'User already exists'}] });
            } else {
                const avatar = gravatar.url(email, {s: '200', r: 'pg', d: 'mm'});
                return bcryptjs.hash(password, 12)                
                    .then(hashPassword => {
                        const user = new User({name: name, email: email, password: hashPassword, avatar: avatar});
                        return user.save();
                    })
                    .then(user => {
                        const payload = { id: user._id };
                        jwt.sign(payload, jwtSecret, (err, token) => {
                            return res.json({ token, user });
                        })
                    })
                    .catch(err => console.error(err));
            }
        })
        .catch(err => res.status(500).send('Server Error'));
}

exports.deleteUser = (req, res, next) => {
    User.findOneAndDelete({ _id: req.user.id })
    .then(user => {
        return Profile.findOneAndDelete({ user: req.user.id })
    })
    .then(() => {
        res.json({ msg: 'User & Profile removed' });
    })
    .catch(err => {
        res.status(400).json({ msg: 'Server Error' });
    })
}