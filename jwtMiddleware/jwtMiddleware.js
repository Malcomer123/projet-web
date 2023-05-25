//require JWT
const jwt = require('jsonwebtoken')

const secretKey = 'safeKey';

function generateToken (payload){
    return jwt.sign(payload, secretKey, {expiresIn: "1h"});
}
const verifyTokenMiddleware = (req, res, next) => {
    const token = req.headers.token;

    if (token === undefined || token === 'undefined') {
        return res.status(205).json({ message: 'Unauthorized request1' ,token: req.headers.token, status: false});
    }
    try {
        req.user = jwt.verify(token, secretKey);
        next();
    } catch (error) {
        return res.status(401).json(false);
    }
};



module.exports = { generateToken, verifyTokenMiddleware}
