function get_error(req, res) {
    res.render('article', {
        title: 'page not found',
        article: {
            header: 'Page not found',
            content: 'What happened? The page not found. Maybe it was removed. Check url address and try to go to the page again.'
        }
    });
}

function get_index(req, res) {
    res.render(req.isAuthenticated() ? 'user' : 'guest', {title: 'main page'});
}

function add_user_to_response(req, res, next) {
    res.locals.user = req.user;
    next();
}

function get_license(req, res) {
    res.render('license', { title: 'license agreement' });
}

module.exports = {
    get_error: get_error,
    get_index: get_index,
    add_user_to_response: add_user_to_response,
    get_license: get_license
};