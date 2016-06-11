function make_router() {
    var router = require('express').Router();
    var profile = require('./profile');

    router.get('/', profile.profile);

    return router;
}

module.exports = make_router;