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

<<<<<<< HEAD
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
            res.redirect('/');
        }
    });
}

function register_user(req, res) {
    var User = require('./models').User;
    User.findOne({'email':  req.body.email}, function(er, user) {
        if (er) {
            req.flash('error', er);
            signup(req, res);
        }
        else if (user) {
            req.flash('error', 'User "' + req.body.email + '" already exist.');
            signup(req, res);
        }
        else
        {
            create_user(req, res, User);
        }
    });
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup,
    register_user: register_user
};