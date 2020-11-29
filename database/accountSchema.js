const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    userId: String,
    userPwd: String
})

module.exports = mongoose.model('account', accountSchema, 'account')