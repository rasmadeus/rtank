var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var nunjucks = require('express-nunjucks');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var routes = require('./routes/index');
var users = require('./routes/users');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
     done(null, user);
});


var app = express();

passport.use(new LocalStrategy(
    function(username, password, done) {
        if (username === "rasmadeus@gmail.com" && password === "1") {
            return done(null, {user: {name: username, id: 12}});
        }
        else {
            return done(null, false);
        }
    })
);



app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
nunjucks.setup({autoescape: true, throwOnUndefined: false, trimBlocks: false, lstripBlocks: false, watch: true, noCache: true, tags: {}}, app);

app.use(favicon(path.join(__dirname, '/public/img/favicon.png')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(require('express-session')({ secret: 'keyboard cat', resave: false, saveUninitialized: false }));

app.use(passport.initialize());
app.use(passport.session());


app.use('/js', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, '/node_modules/jquery/dist')));
app.use('/css', express.static(path.join(__dirname, '/node_modules/bootstrap/dist/css')));

app.use('/', routes);
app.use('/users', users);


app.post('/users/login', passport.authenticate('local', {failureRedirect: '/users/login', successRedirect: '/'}));

app.use(function(req, res) {
    res.render('article', {
        title: 'cтраница не найдена',
        article: {
            header: 'Такой страницы не существует',
            content: 'Возможно страница была перемещена или удалена. Проверьте правильность введённого url адреса. Если ничего не помогает, попробуйте начать поиск на главной странице.'
        }
    });
});

module.exports = app;