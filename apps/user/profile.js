function get_profile(req, res, next) {
    if (req.isAuthenticated())
        res.render('profile', {title: 'user profile'});
    else
        next();
}

function get_nickname(req, res, next) {
    if (req.isAuthenticated())
        res.render('nickname', {title: 'change nickname', form_header: 'Change your nickname'});
    else
        next();
}

function post_nickname(req, res, next) {
    if (req.isAuthenticated())
        change_nickname(req, res, next);
    else
        next();
}

function change_nickname(req, res, next) {
    if (req.body.nickname.length < 1)
    {
        req.flash('error', 'Nickname must not be empty.');
        get_nickname(req, res, next);
    }
    else
    {
        req.user.nickname = req.body.nickname;
        req.user.save(function (er){
            if (er) {
                req.flash('error', 'Now we aren\'t able to change your email. Try again please.');
                get_nickname(req, res, next);
            }
            else {
                get_profile(req, res, next);
            }
        });
    }
}

function get_avatar(req, res, next) {
    if (req.isAuthenticated())
        res.render('avatar', {title: 'user avatar', form_header: 'Load your avatar'});
    else
        next();
}

function show_avatar_error(req, res, next) {
    req.flash('error', 'Your avatar connot be load. Maybe the image is too big. Try again, please.');
    get_avatar(req, res, next);
}

function save_path_to_avatar(req, res, next) {
    req.user.avatar = '/img/users/' + req.file.filename;
    req.user.save(function(er){
        if (er)
            show_avatar_error(req, res, next);
        else
            get_profile(req, res, next);
    });
}

function save_avatar(req, res, next) {
    var multer = require('multer');
    var multer_options = {
        dest: './public/img/users',
        limits: {
            fieldNameSize: 100,
            fileSize: 1024 * 1024,
            files: 1,
            fields: 1
        }
    };

    multer(multer_options).single('avatar')(req, res, function(er){
        if (er || !req.file)
            show_avatar_error(req, res, next);
        else
            save_path_to_avatar(req, res, next);
    });
}

function post_avatar(req, res, next) {
    if (req.isAuthenticated())
        save_avatar(req, res, next);
    else
        next();
}

module.exports = {
    get_profile: get_profile,
    get_nickname: get_nickname,
    post_nickname: post_nickname,
    get_avatar: get_avatar,
    post_avatar: post_avatar
};