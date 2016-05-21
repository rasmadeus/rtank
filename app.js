function setup_logger(app) {
    var logger = require('morgan');
    app.use(logger('dev'));
}

function setup_view(app) {
    var nunjucks = require('express-nunjucks');
    app.set('view engine', 'html');
    nunjucks.setup(
        {
            autoescape: true,
            throwOnUndefined: false,
            trimBlocks: false,
            lstripBlocks: false,
            watch: true,
            noCache: true,
            tags: {}
        },
        app
    );
}

function setup_static_paths(app, express) {
    var path = require('path');

    app.set('views', path.join(__dirname, 'views'));

    var favicon = require('serve-favicon');
    app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));

    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
    app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
    app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
}

function setup_session(app) {
    var bodyParser = require('body-parser');
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    var cookieParser = require('cookie-parser');
    app.use(cookieParser());

    var session = require('express-session');
    app.use(session({ secret: 'this is a tankappliocationsuper game by author rasmadeus', resave: false, saveUninitialized: false }));
}

function setup_routing(app) {
    var root = require('./apps/root/urls');
    app.use('/', root());

    var users = require('./apps/user/urls');
    var passport = require('./apps/user/passport')(app);
    app.use('/users', users(passport));

    var error = require('./apps/root/error');
    app.use(error);
}

function make_application() {
    var express = require('express');

    var app = express();
    setup_logger(app);
    setup_view(app);
    setup_static_paths(app, express);
    setup_session(app);
    setup_routing(app);

    return app;
}

module.exports = make_application();

