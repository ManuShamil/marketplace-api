/**
 * @name lib\market\getCheapestItem.js
 */

const { listingModel } = require('../../models/market')

const getCheapestItem = (item) => {
    return new Promise((resolve, reject) => {
        listingModel
            .findOne( { item } )
            .sort( { listPrice: 1} )
            .limit(1)
            .select( { __v: 0} )
            .populate('seller', 'accountID -_id')
            .populate('item', 'itemName -_id')
            .exec((err, doc) => {
                if(!doc) {
                    reject({
                        status: 404,
                        message: `Could not find item`
                    })
                    return;
                }

                reject({
                    status: 200,
                    message: `succesfully retrieved cheapest item`,
                    result: doc
                })
            });
    })
}

module.exports = {
    getCheapestItem
}