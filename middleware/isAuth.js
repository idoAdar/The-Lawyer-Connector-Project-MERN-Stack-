const jwt = require('jsonwebtoken');
const jwtSecret = require('config').get('jwtSecret');

module.exports = (req, res, next) => {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).json({ msg: 'Token not found' });
    }
    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch(err) {
        return res.status(401).json({ msg: 'Token is not valid' })
    }
}