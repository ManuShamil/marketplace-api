const mongoose = require('mongoose')

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

listingConfigSchema.pre('remove', function(next) {
    this.model('marketlistings').remove({ item: this._id }, next);
});

const donatorConfigSchema = 
    mongoose.Schema({
        steamUID: {
            type: String,
            unique: true,
            required: true
        }
    });


const listingConfigModel = 
    new mongoose.model( "listingconfigs", listingConfigSchema);

const donatorConfigModel = 
    new mongoose.model( "donatorconfigs", donatorConfigSchema);

module.exports = { listingConfigModel, donatorConfigModel }