const mongoose = require('mongoose')
const Schema = mongoose.Schema

const roleSchema = Schema({
    ADMIN: {type: String, required: true, default: 'admin'},
    USER: {type: String, required: true, default: 'user'}
})

module.exports = mongoose.model('Role', roleSchema)