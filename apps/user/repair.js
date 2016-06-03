function repair(req, res) {
    res.render('repair', { title: 'password repair'});
}

function _show_repair_error(req, res, er) {
    req.flash('error', er);
    repair(req, res);
}

function _let_user_change_password(req, res, user) {
    res.redirect('/');
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

module.exports = {
    repair: repair,
    let_user_change_password: let_user_change_password
};