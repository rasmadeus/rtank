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

function make_passport(app) {
    var passport = require('./apps/user/passport')();
    app.use(passport.initialize());
    app.use(passport.session());
    return passport;
}

function setup_routing(app) {
    var users = require('./apps/user/urls');
    var root = require('./apps/root/views');
    var passport = make_passport(app);

    app.use(root.add_user_to_response);
    app.get('/', root.index);
    app.use('/users', users(passport));
    app.use(root.error);
}

function connect_to_db() {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://rtank:rtankrtank@ds025232.mlab.com:25232/rtank');
}

function make_application() {
    var express = require('express');

    var app = express();
    setup_logger(app);
    setup_view(app);
    setup_static_paths(app, express);
    setup_session(app);
    setup_routing(app);
    connect_to_db();

    return app;
}


module.exports = make_application();