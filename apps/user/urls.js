function make_router(passport) {
    var router = require('express').Router();

    router.get('/login', function(req, res) {
        res.render('login', { title: 'авторизация' });
    });

    router.post('/login',
        passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/'})
    );

    return router;
}


module.exports = make_router;