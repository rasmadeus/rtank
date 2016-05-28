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

module.exports = {
    login: login,
    logout: logout,
    signup: signup
};