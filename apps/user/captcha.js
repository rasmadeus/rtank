var Canvas = require('canvas');

function append_default_params(params) {
    params.color = params.color || 'rgb(0,100,100)';
    params.background = params.background || 'rgb(255,200,150)';
    params.lineWidth = params.lineWidth || 8;
    params.fontSize = params.fontSize || 80;
    params.codeLength = params.codeLength || 6;
    params.canvasWidth = params.canvasWidth || 250;
    params.canvasHeight = params.canvasHeight || 150;
}

function make_context(canvas, params) {
    var context = canvas.getContext('2d');
    context.antialias = 'gray';
    context.fillStyle = params.background;
    context.fillRect(0, 0, params.canvasWidth, params.canvasHeight);
    context.fillStyle = params.color;
    context.lineWidth = params.lineWidth;
    context.strokeStyle = params.color;
    context.font = params.fontSize + 'px sans';
    return context;
}

function paint_text(context, params, text) {
    for (i = 0; i < text.length; i++) {
        context.setTransform(
            Math.random() * 0.5 + 1,
            Math.random() * 0.4,
            Math.random() * 0.4,
            Math.random() * 0.5 + 1,
            Math.floor(0.5 * params.fontSize) * i + Math.floor(0.25 * params.fontSize),
            Math.floor(1.25 * params.fontSize)
        );
        context.fillText(text.charAt(i), 0, 0);
    }
}

function make_canvas_buf_handler(req, res, text) {
    return function(er, buf) {
        if(req.session)
            req.session.captcha = text;

        res.type('jpg');
        res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
        res.header('Expires', 'Sun, 12 Jan 1986 12:00:00 GMT');
        res.end(buf);
    };
}

function make_middleware(params) {
    return function(req, res, next) {
        if(req.path.replace(/\?.*$/, '') !== params.url)
            return next();

        var canvas = new Canvas(params.canvasWidth , params.canvasHeight);
        var context = make_context(canvas, params);
        var text = params.text || ('' + Math.random()).substr(3, params.codeLength);

        paint_text(context, params, text);
        canvas.toBuffer(make_canvas_buf_handler(req, res, text));
    };
}

module.exports = function(params) {
    append_default_params(params);
    return make_middleware(params);
};