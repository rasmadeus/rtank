function make_router(passport) {
    var router = require('express').Router();
    var views = require('./views');

    router.get('/login', views.login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/'}));

    router.get('/logout', views.logout);

    router.get('/signup', views.signup);

    return router;
}


module.exports = make_router;