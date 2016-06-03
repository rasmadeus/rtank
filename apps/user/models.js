var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Model = mongoose.Schema;

var User = new Model({
    email: {type: String, requied: true, unique: true},
    password: {type: String, required: true},
    registration_date_time: {type: Date, default: Date.now()},
    group: {type: String, enum: ['Admin', 'User'], default: 'User'}
});

User.path('password').set(function(value) {
    return bcrypt.hashSync(value, 10);
});

User.methods.isValid = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var UserConfirmCode = new Model({
    user: [{type: Model.Types.ObjectId, ref: 'User'}],
    code: {type: String, required: true},
    creation_date_time: {type: Date, default: Date.now()}
});

UserConfirmCode.path('code').set(function(value) {
    return bcrypt.hashSync(value, 10);
});

UserConfirmCode.methods.isValid = function(code) {
    return bcrypt.compareSync(code, this.code);
};


module.exports = {
    User: mongoose.model('User', User),
    UserConfirmCode: mongoose.model('UserConfurmCode', UserConfirmCode)
};