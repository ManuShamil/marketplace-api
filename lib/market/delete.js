/**
 * @name lib\market\delete.js
 */

const { listingModel } = require('../../models/market')
const { accountModel } = require('../../models/account')
const { refreshIndex } = require('./refreshIndex')

const deleteListing = (_id) => {
    return new Promise((resolve, reject) => {
 
        listingModel.findOneAndDelete({
            _id
        })
        .populate('item', '-_id itemName listPrice condition')
        .exec((err, result) => {
            if(!result) {
                reject({
                    status: 500,
                    message: `Could not delete listing`
                })
                return;
            }

            var { seller, condition } = result;
            var item = result.item._id;
            var deletedItem = { 
                itemName: result.item.itemName,
                listPrice: result.listPrice,
                condition: result.condition     
            };

            console.log(result)

            
            accountModel
            .findOneAndUpdate(
                {   _id: seller },
                {
                    $inc: { listingsCount: -1}  },
                {   new: true },
                (err, doc) => {
                    if(!doc) {
                        reject({
                            status: 500,
                            message: `seller not found`
                        })
                        return;
                    }

                    refreshIndex( item, condition )
                    .then( result => {
                        resolve({
                            deletedItem
                        })
                    }).catch(result => {
                        resolve({
                            deletedItem
                        })
                    })


                }
            )
        })
    })
}

module.exports = {
    deleteListing
}