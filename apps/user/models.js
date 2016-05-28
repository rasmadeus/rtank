function make_user_model() {
    var mongoose = require('mongoose');
    var schema = new mongoose.Schema({
        email: {type: String},
        password: {type: String}
    });
    return mongoose.model('User', schema);
}

module.exports = {
    user: make_user_model()
};