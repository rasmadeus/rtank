function show_login_error(req, er, done) {
    req.flash('error', er);
    done(null, false);
}

module.exports = {
    login: function(req, res){
        res.render('login', { title: 'authentication', form_header: 'Introduce yourself, please' });
    },

    logout: function(req, res){
        req.logOut();
        res.redirect('/');
    },

    try_login: function(req, email, password, done){
        var User = require('./models').User;
        User.findOne({'email':  email}, function(er, user) {
            if (er || !user || !user.isValid(password))
                show_login_error(req, 'Login error. Try again or signup', done);
            else
                done(null, user);
        });
    }
};