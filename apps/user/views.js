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

function register_user(req, res) {
    req.flash('error', 'User already exist!');
    signup(req, res);
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup,
    register_user: register_user
};