const User = require('../user/model');
const config = require('../config');
const passport = require('passport');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const localStrategy = async (email, password, done) => {
    try {
        let user = await User
        .findOne({us_email: email})
        .select('-__v -us_updated_at -us_created_at -token');
        if(!user) return done();
        if(bcrypt.compareSync(password, user.us_password)) {
            ({us_password, ...userWithoutPassword } = user.toJSON() )
        return done(null, userWithoutPassword)
    }
    } catch (err) {
        done(err, null)
        }
        done();
}

const login = async (req, res, next) => {
    passport.authenticate('local', async (err, user) => {
        if(err) return next(err)
        
        if(!user) return res.status(400).json({message: 'Email or Password incorrect'})
        
        let signed = jwt.sign(user, config.secretKey)

        await User.findByIdAndUpdate(user._id, {$push : {token: signed}})

        res.cookie('token', signed ,{
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            message: 'Login Succesfully',
            user,
            token: signed 
        })
    })(req, res, next)
}

const logout = async (req, res, next) => {
    const token = req.cookies.token;

    if(!token) return res.sendStatus(204);

    res.clearCookie('token');
    
    return res.sendStatus(200);
}


module.exports = {
    localStrategy,
    login,
    logout
}