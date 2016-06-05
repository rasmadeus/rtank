function make_router(passport) {
    var router = require('express').Router();
    var login = require('./login');
    var repair = require('./repair');
    var signup = require('./signup');

    router.get('/login', login.login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/', failureFlash : true}));

    router.get('/logout', login.logout);

    router.get('/signup', signup.signup);
    router.post('/signup', signup.register_user);

    router.get('/repair', repair.repair);
    router.post('/repair', repair.let_user_change_password);
    router.get('/code', repair.code);

    router.get('/reset_password', repair.reset_password);
    router.post('/reset_password', repair.try_reset_password);

    return router;
}

module.exports = make_router;