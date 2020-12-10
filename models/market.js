const mongoose = require('mongoose')

const { accountModel } = require('./account')

const listingSchema = 
    new mongoose.Schema({
        listPrice: {
            type: Number,
            required: true,
            min: 0
        },
        seller: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'accounts',
            required: true
        },
        condition: {
            type: Number,
            default: 0,
            enum: [0, 1, 2]
        },
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "listingconfigs",
            required: true
        },
    });

listingSchema.pre('save', function(next) {
    accountModel
        .updateOne(
            { _id: this.seller }, 
            { 
                $push: { Listings: this._id },
                $inc: { listingsCount: 1}
            }, 
        next);
});


var marketIndexSchema = 
    new mongoose.Schema({
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "listingconfigs",
            required: true
        },
        cheapestListing: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "marketlistings"
        },
        condition: {
            type: Number
        }
    })


const marketIndexModel = new mongoose.model( 'marketindeces', marketIndexSchema)
const listingModel = new mongoose.model( 'marketlistings', listingSchema)

module.exports = { listingModel, marketIndexModel }