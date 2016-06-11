function profile(req, res, next) {
    if (req.isAuthenticated())
        res.render('profile', {title: 'user profile'});
    else
        next();
}

function nickname(req, res, next) {
    if (req.isAuthenticated())
        res.render('nickname', {title: 'change nickname', form_header: 'Change your nickname'});
    else
        next();
}

function change_nickname(req, res, next) {
    if (req.body.nickname.length < 1)
    {
        req.flash('error', 'Nickname must not be empty.');
        nickname(req, res, next);
    }
    else
    {
        req.user.nickname = req.body.nickname;
        req.user.save(function (er){
            if (er) {
                req.flash('error', 'Now we aren\'t able to change your email. Try again please.');
                nickname(req, res, next);
            }
            else {
                profile(req, res, next);
            }
        });
    }
}

function avatar(req, res, next) {
    if (req.isAuthenticated())
        res.render('avatar', {title: 'user avatar', form_header: 'Load your avatar'});
    else
        next();
}

module.exports = {
    profile: profile,

    nickname: nickname,

    try_change_nickname: function(req, res, next) {
        if (req.isAuthenticated())
            change_nickname(req, res, next);
        else
            next();
    },

    avatar: avatar
};