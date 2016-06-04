function error(req, res) {
    res.render('article', {
        title: 'page not found',
        article: {
            header: 'Page not found',
            content: 'What happened? The page not found. Maybe it was removed. Check url address and try to go to the page again.'
        }
    });
}

function index(req, res) {
    res.render('article', {
        title: 'main page',
        article: {
            header: 'RTank project',
            content: 'The project is developing! Come to see us some later!'
        }
    });
}

function add_user_to_response(req, res, next) {
    res.locals.user = req.user;
    next();
}

function develop_error_handler(er, req, res, next) {
    res.status(er.status || 500);
    res.render('article', {
        title: 'application error happened',
        article: {
            header: 'Error',
            content: er.message
        }
    });
}

function production_error_handler(er, req, res, next) {
    res.status(er.status || 500);
    res.render('article', {
        title: 'application error happened',
        article: {
            header: 'Error',
            content: 'Error happened. Status - ' + er.status
        }
    });
}

module.exports = {
    error: error,
    index: index,
    add_user_to_response: add_user_to_response,
    develop_error_handler: develop_error_handler,
    production_error_handler: production_error_handler
};