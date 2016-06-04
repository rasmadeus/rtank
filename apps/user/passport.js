function make_passport() {
    var passport = require('passport');
    var login = require('./login').try_login;

    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        var User = require('./models').User;
        User.findById(id, function(er, user) {
            done(er, user);
        });
    });

    var LocalStrategy = require('passport-local').Strategy;
    passport.use(new LocalStrategy({usernameField: 'email', passwordField: 'password', passReqToCallback: true}, login));

    return passport;
}


module.exports = make_passport;