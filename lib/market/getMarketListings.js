/**
 * @name lib\market\getMarketListings.js
 */


const { listingModel } = require('../../models/market');
const { accountModel } = require('../../models/account')
const { getListableItemIDsbyName } = require('../config/getConfigListings')


/**
 * @summary retrieves all items from market listings
 * @name getMarketListings
 * @param {String} searchFilter
 * @param {Number} condition
 * @param {Number} limit
 * @param {Number} offset 
 * @returns {Array}
 */
const getMarketListings = async (body) => {

    var { searchFilter, limit, offset, condition, sort } = body;

    var searchOptions = { }
    if( searchFilter === undefined) searchFilter = searchOptions
    else {
        await getListableItemIDsbyName(searchFilter)
        .then(result => {
            var itemIDs = result.result;

            searchOptions = { item: { $in: itemIDs }}
        }).catch(result => {
            return new PromiseRejectionEvent(result);
        })
    
    }

    if(condition !== undefined)
        searchOptions["condition"] = condition


    return new Promise((resolve, reject) => {

        listingModel.find(searchOptions)
        .select("-__v -item")
        .populate('seller','-_id -__v -Listings -accountBalance')
        .skip(offset)
        .limit(limit)
        .sort({ listPrice : sort || 1})
        .exec((err, doc) => {
            if(err) {
                console.log(err)
                reject({
                    status: 404,
                    message: `Could not retrieve items`
                })
                return;
            }

            resolve({
                status: 200,
                message: `Succesfully retrieved items`,
                limit: limit,
                offset: offset,
                length: doc.length,
                result: doc
            })
        })

    })
}

module.exports = {
    getMarketListings
}