function login(username, password, done) {
    if (username === "rasmadeus@gmail.com" && password === "1")
        return done(null, {user: {name: username, id: 12}});
    else
        return done(null, false);
};

function make_passport(app) {
    var passport = require('passport');

    passport.serializeUser(function(user, done) {
        done(null, user);
    });

    passport.deserializeUser(function(user, done) {
        done(null, user);
    });

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy(login));

    app.use(passport.initialize());
    app.use(passport.session());

    return passport;
}


module.exports = make_passport;