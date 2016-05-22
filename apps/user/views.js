function login(req, res) {
    res.render('login', { title: 'авторизация' });
}

function logout(req, res) {
    req.logOut();
    res.redirect('/');
}

module.exports = {
    login: login,
    logout: logout
};