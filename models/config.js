const mongoose = require('mongoose')

const { listingModel } = require('./market')

const listingConfigSchema = 
    mongoose.Schema({
        itemName: {
            unique: true,
            type: String,
            required: true
        },
        minPrice: {
            type: Number,
            default: 0
        },
        maxPrice: {
            type: Number,
            required: true
        }
    });

listingConfigSchema.pre('findOneAndRemove', function(next) {
    var { _id } = this.getQuery();
    listingModel.deleteMany({ item: _id }, next);
});

const donatorConfigSchema = 
    mongoose.Schema({
        steamUID: {
            type: String,
            unique: true,
            required: true
        },
        maxListingCount: {
            type: Number,
            default: 100
        }
    });


const listingConfigModel = 
    new mongoose.model( "listingconfigs", listingConfigSchema);

const donatorConfigModel = 
    new mongoose.model( "donatorconfigs", donatorConfigSchema);

module.exports = { listingConfigModel, donatorConfigModel }