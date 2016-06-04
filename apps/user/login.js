function show_login_error(req, er, done) {
    req.flash('error', er);
    done(null, false);
}

module.exports = {
    login: function(req, res){
        res.render('login', { title: 'authentication' });
    },

    logout: function(req, res){
        req.logOut();
        res.redirect('/');
    },

    try_login: function(req, email, password, done){
        var User = require('./models').User;
        User.findOne({'email':  email}, function(er, user) {
            if (er)
                show_login_error(req, er, done);
            else if (user.isValid(password))
                done(null, user);
            else
                show_login_error(req, 'The password is invalid. Try again.', done);
        });
    }
};