module.exports = {
    profile: function(req, res, next) {
        if (req.isAuthenticated())
            res.render('profile', {title: 'user profile'});
        else
            next();
    }
};