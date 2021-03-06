function check_password(password) {
    var min_password_length = 7;
    return password.length > min_password_length;
}

function check_email(email) {
    return email.length > 0;
}

function create_user(req, res, User) {
    var user = new User();
    user.email = req.body.email;
    user.password = req.body.password;
    user.save(function (er){
        if (er) {
            req.flash('error', er);
            get_signup(req, res);
        }
        else {
            res.redirect('/users/login');
        }
    });
}

function get_signup(req, res) {
    res.render('signup', {title: 'registration', form_header: 'Join to our tank command'});
}

function show_signup_error(req, res, er) {
    req.flash('error', er);
    get_signup(req, res);
}

function try_create_user(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er)
            show_signup_error(req, res, 'Failed to register user. Try again, please.');
        else if (user)
            show_signup_error(req, res, 'User "' + req.body.email + '" already exist. If you forgot your password, you can try <a href="/users/repair">reset one.</a>');
        else
            create_user(req, res, User);
    });
}

function post_signup(req, res) {
    if (!req.body.license)
        show_signup_error(req, res, 'You have to agree with license.');
    else if (req.body.captcha !== req.session.captcha)
        show_signup_error(req, res, 'You have to enter valid digits from the captcha.');
    else if (!check_password(req.body.password))
        show_signup_error(req, res, 'The password length must be minimum 8 symbols.');
    else if (!check_email(req.body.email))
        show_signup_error(req, res, 'Your email is invalid.');
    else
        try_create_user(req, res);
}

module.exports = {
    get_signup: get_signup,
    post_signup: post_signup,
    check_password: check_password
};