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
            res.redirect('/');
        }
    });
}

function _show_error(req, res, er) {
    req.flash('error', er);
    signup(req, res);
}

function _try_create_user(req, res, User) {
    if (_check_password(req.body.password))
        _create_user(req, res, User);
    else
        _show_error(req, res, 'The password length must be minimum 8 symbols.');
}

function register_user(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er)
            _show_error(req, res, er);
        else if (!req.body.license)
            _show_error(req, res, 'You have to to agree with license.');
        else if (user)
            _show_error(req, res, 'User "' + req.body.email + '" already exist.');
        else
            _try_create_user(req, res, User);
    });
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup,
    register_user: register_user
};