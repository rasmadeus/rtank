var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('express-nunjucks');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.setup({autoescape: true, throwOnUndefined: false, trimBlocks: false, lstripBlocks: false, watch: true, noCache: true, tags: {}}, app);

app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

app.use('/', routes);
app.use('/users', users);

app.use(function(req, res) {
    res.render('404', {title: 'cтраница не найдена'});
});

module.exports = app;