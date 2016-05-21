function setup_view(app) {
    var nunjucks = require('express-nunjucks');
    app.set('views', path.join(__dirname, 'views'));
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

function setup_static_paths(app) {
    app.use(express.static(path.join(__dirname, 'public')));
    app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
    app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
    app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');


var app = express();
var passport = require('./apps/user/passport')(app);
setup_view(app);

app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
setup_static_paths(app);
app.use(session({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));
app.use('/', require('./apps/root/index')());
app.use('/users', require('./apps/user/urls')(passport));
app.use(require('./apps/root/error'));

module.exports = app;

