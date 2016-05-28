function make_router(passport) {
    var router = require('express').Router();
    var views = require('./views');

    router.get('/login', views.login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/', failureFlash : true}));

    router.get('/logout', views.logout);

    router.get('/signup', views.signup);
    router.post('/signup', views.register_user);

    return router;
}


module.exports = make_router;