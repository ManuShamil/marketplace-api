const mongoose = require('mongoose')

const accountSchema = new mongoose.Schema({
    accountID: {
        type: String,
        unique: true,
        required: true
    },
    accountBalance: {
        type: Number,
        default: 0,
        min: 0
    },
    listingsCount: {
        type: Number,
        default: 0,
        min: 0
    }

})

const accountModel = new mongoose.model( 'accounts', accountSchema)

module.exports = { accountModel }