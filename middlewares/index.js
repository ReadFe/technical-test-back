const { getToken } = require("../utils")
const jwt = require('jsonwebtoken')
const config = require("../app/config")

const verifyToken = (req, res, next) => {
    try {
        let token = getToken(req);

        if(!token) return res.status(404).json({msg: 'Token is missing'});

        req.user = jwt.verify(token, config.secretKey)

    } catch (err) {
        if(err && err.name === 'JsonWebTokenError') {
            return res.status(400).json({
                error: 1,
                message: err.message
            })
        }

        next(err);
    }

    return next();
}

module.exports = {
    verifyToken
}