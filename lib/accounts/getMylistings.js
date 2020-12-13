const async = require('async')

const { accountModel } = require('../../models/account')
const { listingConfigModel } = require('../../models/config')
const { listingModel } = require('../../models/market')
const { getListableItemIDsbyName } = require('../config/getConfigListings')

const getMylistings = async (params) => {

    var { _id, limit, offset, searchFilter, condition, sort} = params;

        
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

    searchOptions["seller"] = _id;

    return new Promise((resolve, reject) => {


        listingModel
        .countDocuments(searchOptions,
        (err, totalCount) => {

            listingModel.find(searchOptions)
            .select("-__v -seller")
            .populate('item','-__v')
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
                    result: {
                        totalCount,
                        limit,
                        offset,
                        searchFilter,
                        listings: doc
                    }
                })
            })

        });




        return;
    })
}

module.exports = { 
    getMylistings
}