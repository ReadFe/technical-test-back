const router = require('express').Router();
const authController = require('./controller');
const passport = require('passport');
const LocalStrategy = require('passport-local');

passport.use(new LocalStrategy({usernameField: 'us_email', passwordField: 'us_password'}, authController.localStrategy));
router.post('/login', authController.login);
router.delete('/logout', authController.logout);

module.exports = router;
