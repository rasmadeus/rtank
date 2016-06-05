var User = require('./models').User;
var UserConfirm =  require('./models').UserConfirm;

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
                res.redirect('/');
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
            check_user_confirm_code(req, res, userConfirm);
    });
}

module.exports = {
    repair: function(req, res) {
        res.render('repair', { title: 'password repair'});
    },

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
    }
};