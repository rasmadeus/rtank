function make_router(passport) {
    var router = require('express').Router();
    var views = require('./views');

    router.get('/login', views.login);
    router.post('/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/', failureFlash : true}));

    router.get('/logout', views.logout);

    router.get('/signup', views.signup);
    router.post('/signup', views.register_user);

    router.get('/license', views.license);

    router.get('/repair', views.repair);

    return router;
}


module.exports = make_router;