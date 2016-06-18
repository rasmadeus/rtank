var Minifier = require('html-minifier');

module.exports = function(req, res, next) {
    res.oldRender = res.render;
    res.render = function(view, options) {
        this.oldRender(view, options, function(err, html) {
            if (err) throw err;
            html = Minifier.minify(html, {
                removeComments: true,
                removeCommentsFromCDATA: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeEmptyAttributes: true,
                minifyCSS: true,
                minifyJS: true,
                minifyURLs: true
            });
            res.send(html);
        });
    };
    next();
};