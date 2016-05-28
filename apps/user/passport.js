function _login(username, password, done) {
    if (username === "rasmadeus@gmail.com" && password === "1")
        return done(null, {name: username, id: 12});
    else
        return done(null, false);
};

function make_passport() {
    var passport = require('passport');

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        if (id === 12)
            done(null, {name: 'rasmadeus@gmail.com', id: 12});
        else
            done(null, false);
    });

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(_login));

    return passport;
}


module.exports = make_passport;