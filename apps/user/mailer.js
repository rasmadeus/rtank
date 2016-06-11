var mailer = require('nodemailer');

var transporter = mailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'rtankcry@gmail.com',
        pass: 'rtankisthebestapplication'
    }
});

module.exports = {
    mailer: function(req, res, mailOptions, error_handler, success_handler) {
        transporter.sendMail(mailOptions, function(er, info){
            if(er)
                error_handler(req, res);
            else
                success_handler(req, res);
        });
    },

    link: function(req, email, code) {
        return 'http://' + req.headers.host +'/users/confirm?email=' + email + '&code=' + code;
    }
};