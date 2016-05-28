function login(req, res) {
    res.render('login', { title: 'авторизация' });
}

function logout(req, res) {
    req.logOut();
    res.redirect('/');
}

function signup(req, res) {
    res.render('signup', {title: 'регистрация'});
}

module.exports = {
    login: login,
    logout: logout,
    signup: signup
};