function login(req, res) {
    res.render('login', { title: 'authentication' });
}

function logout(req, res) {
    req.logOut();
    res.redirect('/');
}

function signup(req, res) {
    res.render('signup', {title: 'registration'});
}

function _check_password(password) {
    var min_password_length = 7;
    return password.length > min_password_length;
}

function _check_email(email) {
    return email.length > 0;
}

function _create_user(req, res, User) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (er){
        if (er) {
            req.flash('error', er);
            signup(req, res);
        }
        else {
            res.redirect('/users/login');
        }
    });
}

function _show_signup_error(req, res, er) {
    req.flash('error', er);
    signup(req, res);
}

function _show_login_error(req, er, done) {
    req.flash('error', er);
    done(null, false);
}

function _try_create_user(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er)
            _show_signup_error(req, res, er);
        else if (user)
            _show_signup_error(req, res, 'User "' + req.body.email + '" already exist.');
        else
            _create_user(req, res, User);
    });
}

function register_user(req, res) {
    if (!req.body.license)
        _show_signup_error(req, res, 'You have to agree with license.');
    else if (req.body.captcha !== req.session.captcha)
        _show_signup_error(req, res, 'You have to enter valid digits from the captcha.');
    else if (!_check_password(req.body.password))
        _show_signup_error(req, res, 'The password length must be minimum 8 symbols.');
    else if (!_check_email(req.body.email))
        _show_signup_error(req, res, 'Your email is invalid.');
    else
        _try_create_user(req, res);
}

function try_login(req, email, password, done) {
    var User = require('./models').User;
    User.findOne({'email':  email}, function(er, user) {
        if (er)
            _show_login_error(req, er, done);
        else if (user.isValid(password))
            done(null, user);
        else
            _show_login_error(req, 'The password is invalid. Try again.', done);
    });
 };

function license(req, res) {
    res.render('license', { title: 'license agreement' });
}

function repair(req, res) {
    res.render('repair', { title: 'password repair'});
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup,
    register_user: register_user,
    try_login: try_login,
    license: license,
    repair: repair
};