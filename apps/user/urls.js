function make_router(passport) {
    var router = require('express').Router();
    var login = require('./login');
    var repair = require('./repair');
    var signup = require('./signup');
    var profile = require('./profile');

    router.get('/login', login.get_login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/users/profile', failureFlash : true}));

    router.get('/logout', login.get_logout);

    router.get('/signup', signup.get_signup);
    router.post('/signup', signup.post_signup);

    router.get('/repair', repair.get_repair);
    router.post('/repair', repair.post_repair);
    router.get('/confirm', repair.get_confirm);

    router.get('/profile', profile.get_profile);

    router.get('/profile/password', repair.get_password);
    router.post('/profile/password', repair.post_password);

    router.get('/profile/nickname', profile.get_nickname);
    router.post('/profile/nickname', profile.post_nickname);

    router.get('/profile/avatar', profile.get_avatar);
    router.post('/profile/avatar', profile.post_avatar);

    return router;
}

module.exports = make_router;