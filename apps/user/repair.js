var User = require('./models').User;
var UserConfirm =  require('./models').UserConfirm;
var check_password = require('./signup').check_password;

function show_repair_error(req, res, er) {
    req.flash('error', er);
    repair(req, res);
}

function show_common_repair_error(req, res) {
    show_repair_error(req, res, 'Repair code failed. Try again in few minutes.');
}

function show_code_checking_error(req, res) {
    show_repair_error(req, res, 'Code is invalid. Try repair password again.');
}

function show_reset_password_error(req, res, er) {
    req.flash('error', er);
    reset_password(req, res);
}

function show_common_reset_password_error(req, res) {
    show_reset_password_error('Reset password error. Try again, please.');
}

function make_success_page_handler(req, res, email) {
    return function(req, res){
        res.render('article', {
            title: 'password repair',
            article: {
                header: 'Password repair',
                content: 'A letter was sent to ' + email +'. Read this letter and do actions which are described in one!'
            }
        });
    };
}

function send_code(req, res, email, code) {
    var mailer = require('./mailer');

    var text = '<h1>Hello!</h1>\
        You have sent a request for password recovery.<br />\
        In order to set a new password, please <a href="' + mailer.link(req, email, code) + '">go to here</a>.<br />\
        Please disregard this letter if it is hit by mistake to you.';

    var mailOptions = {
        from: 'rtankcry@gmail.com',
        to: email,
        subject: 'Password reset',
        html: text
    };

    mailer.mailer(req, res, mailOptions, show_common_repair_error, make_success_page_handler(req, res, email));
}

function save_user_confirm(req, res, user, userConfirm, code) {
    userConfirm.save(function (er){
        if (er)
            show_common_repair_error(req, res);
        else
            send_code(req, res, user.email, code);
    });
}

function let_user_change_password(req, res, user) {
    var code = require("randomstring").generate();

    UserConfirm.findOne({'user': user}, function(er, userConfirm){
        if (er) {
            show_common_repair_error(req, res);
        }
        else if (userConfirm) {
            userConfirm.code = code;
            save_user_confirm(req, res, user, userConfirm, code);
        }
        else {
            var userConfirm = new UserConfirm();
            userConfirm.user = user;
            userConfirm.code = code;
            save_user_confrim(req, res, user, userConfirm, code);
        }
    });
}

function check_user_confirm_code(req, res, user, userConfirm) {
    if (userConfirm.isValid(req.query.code)) {
        req.logIn(user, function(er){
            if (er)
                show_code_checking_error(req, res);
            else
                res.redirect('/users/reset_password');
        });
    }
    else {
        show_code_checking_error(req, res);
    }
}

function code(req, res, user) {
    UserConfirm.findOne({'user': user}, function(er, userConfirm){
        if (er || !userConfirm)
            show_code_checking_error(req, res);
        else if (userConfirm)
            check_user_confirm_code(req, res, user, userConfirm);
    });
}

function try_reset_password(req, res, user) {
    user.password = req.body.password;
    user.save(function (er){
        if (er) {
            show_common_reset_password_error(req, res);
        }
        else {
            res.render('article', {
                title: 'password reset',
                article: {
                    header: 'Password reset',
                    content: 'Your password was changed succesfully!'
                }
            });
        }
    });
}

function repair(req, res) {
    res.render('repair', { title: 'password repair'});
}

function reset_password(req, res) {
    if (req.isAuthenticated())
        res.render('reset_password', { title: 'reset password'});
    else
        res.redirect('/');
}

module.exports = {
    repair: repair,

    let_user_change_password: function(req, res) {
        User.findOne({'email':  req.body.email}, function(er, user) {
            if (er || !user)
                show_common_repair_error(req, res);
            else
                let_user_change_password(req, res, user);
        });
    },

    code: function(req, res) {
        User.findOne({'email':  req.query.email}, function(er, user) {
            if (er || !user)
                show_common_repair_error(req, res);
            else
                code(req, res, user);
        });
    },

    reset_password: reset_password,

    try_reset_password: function(req, res) {
        if (!req.isAuthenticated()) {
            show_common_reset_password_error(req, res);
        }
        else if (!check_password(req.body.password)) {
            show_reset_password_error(req, res, 'The password length must have 8 symbols minimum.');
        }
        else {
            User.findOne({'email':  req.user.email}, function(er, user) {
                if (er || !user)
                    show_common_reset_password_error(req, res);
                else
                    try_reset_password(req, res, user);
            });
        }
    }
};