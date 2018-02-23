var mongoose = require('mongoose');

var CustomerSchema = mongoose.Schema({
    emailId: String,
    mobileNo: String,
    name: String,
    password: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Customer', CustomerSchema);
