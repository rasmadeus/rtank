function make_router(passport) {
    var router = require('express').Router();
    var login = require('./login');
    var repair = require('./repair');
    var signup = require('./signup');
    var profile = require('./profile');

    router.get('/login', login.login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/users/profile', failureFlash : true}));

    router.get('/logout', login.logout);

    router.get('/signup', signup.signup);
    router.post('/signup', signup.register_user);

    router.get('/repair', repair.repair);
    router.post('/repair', repair.let_user_change_password);
    router.get('/confirm', repair.code);

    router.get('/profile', profile.profile);

    router.get('/profile/password', repair.reset_password);
    router.post('/profile/password', repair.try_reset_password);

    router.get('/profile/nickname', profile.nickname);
    router.post('/profile/nickname', profile.try_change_nickname);

    router.get('/profile/avatar', profile.avatar);

    return router;
}

module.exports = make_router;