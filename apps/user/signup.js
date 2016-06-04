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
            signup(req, res);
        }
        else {
            res.redirect('/users/login');
        }
    });
}

function show_signup_error(req, res, er) {
    req.flash('error', er);
    signup(req, res);
}

function try_create_user(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er)
            show_signup_error(req, res, er);
        else if (user)
            show_signup_error(req, res, 'User "' + req.body.email + '" already exist.');
        else
            create_user(req, res, User);
    });
}

module.exports = {
    signup: function(req, res) {
        res.render('signup', {title: 'registration'});
    },

    register_user: function(req, res) {
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
};