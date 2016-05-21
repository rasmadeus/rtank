function make_router() {
    var router = require('express').Router();

    router.get('/', function(req, res) {
        res.render('index', { title: 'авторизация' });
    });

    return router;
}

module.exports = make_router;
