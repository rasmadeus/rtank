function show_login_error(req, er, done) {
    req.flash('error', er);
    done(null, false);
}

function get_login(req, res) {
    res.render('login', { title: 'authentication', form_header: 'Introduce yourself, please' });
}

function get_logout(req, res) {
    req.logOut();
    res.redirect('/');
}

function try_login(req, email, password, done) {
    var User = require('./models').User;
    User.findOne({'email':  email}, function(er, user) {
        if (er || !user || !user.isValid(password))
            show_login_error(req, 'Login error. Try again or signup', done);
        else
            done(null, user);
    });
}

module.exports = {
    get_login: get_login,
    get_logout: get_logout,
    try_login: try_login
};