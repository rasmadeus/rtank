function repair(req, res) {
    res.render('repair', { title: 'password repair'});
}

function _show_repair_error(req, res, er) {
    req.flash('error', er);
    repair(req, res);
}

function _send_code(req, res, email, code) {
    var mailer = require('nodemailer');
    var transporter = mailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'rtankcry@gmail.com',
            pass: 'rtankisthebestapplication'
        }
    });

    var text = '<h1>Hello!</h1> You have sent a request for password recovery.<br /> In order to set a new password, please <a href="https://rtank.herokuapp.com/users/password_repair?email=' + email + '?code=' + code + '">go to here</a>.<br /> Please disregard this letter if it is hit by mistake to you.';

    var mailOptions = {
        from: 'rtankcry@gmail.com',
        to: email,
        subject: 'Password reset',
        html: text
    };

    transporter.sendMail(mailOptions, function(er, info){
    if(er){
        _show_repair_error(req, res, er);
    }else{
        res.render('article', {
            title: 'password repair',
            article: {
                header: 'Password repair',
                content: 'A letter was sent to ' + email +'. Read this letter and do actions which are described in one!'
            }
        });
    };
});
}

function _let_user_change_password(req, res, user) {
    var UserConfirm =  require('./models').UserConfirm;
    var code = require("randomstring").generate();
    var userConfirm = new UserConfirm();
    userConfirm.user = user;
    userConfirm.code = code;
    userConfirm.save(function (er){
        if (er) {
            _show_repair_error(req, res, er);
        }
        else {
            _send_code(req, res, user.email, code);
        }
    });
}

function let_user_change_password(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er)
            _show_repair_error(req, res, er);
        else if (user)
            _let_user_change_password(req, res, user);
        else
            _show_repair_error(req, res, 'User with ' + req.body.email + ' is not registered!');
    });
}

function password_repair(req, res) {
    res.redirect('/');
}

module.exports = {
    repair: repair,
    let_user_change_password: let_user_change_password,
    password_repair: password_repair
};