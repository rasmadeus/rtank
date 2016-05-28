var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var Model = mongoose.Schema;

var User = new Model({
    email: {type: String, requied: true, unique: true},
    password: {type: String, required: true},
    registration_date_time: {type: Date, default: Date.now()},
    group: {type: String, enum: ['Unverified', 'Admin', 'User'], default: 'Unverified'}
});

User.path('password').set(function(value) {
    return bcrypt.hashSync(value, 10);
});

User.methods.isValid = function(password) {
    return bcrypt.compareSync(password, this.password);
};

var UnverifiedUserCode = new Model({
    code: {type: String},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

module.exports = {
    User: mongoose.model('User', User),
    UnverifiedUserCode: mongoose.model('UnverifiedUserCode', UnverifiedUserCode)
};