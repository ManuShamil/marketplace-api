const { marketIndexModel, listingModel } = require('../../models/market')
const { getListableItemIDsbyName } = require('../config/getConfigListings')
const async = require('async')

const getIndeces = (params) => {
    return new Promise((resolve, reject) => {

        if(params)
            var { searchFilter, limit, offset } = params;

        console.log(searchFilter)

        getListableItemIDsbyName(searchFilter)
        .then(result => {
            var itemIDs = result.result;
            var searchOptions = { item: { $in: itemIDs }}

            marketIndexModel
            .countDocuments(searchOptions,
            (err, totalCount) => {
                marketIndexModel.find(searchOptions)
                .skip(offset)
                .limit(limit)
                .select({ __v: 0, _id: 0})
                .populate('item', 'itemName -_id')
                .populate('cheapestListing', '-__v -item')
                .exec((err, doc) => {
                    if(!doc) {
                        resolve({
                            status: 500,
                            message: `Could not send indeces`
                        })
                        return;
                    }
        
                    async.forEach(doc,function(item,callback) {
                        listingModel
                        .populate(item.cheapestListing, 
                            { path: 'seller', select: 'accountID -_id'},
                            (err, output) => {
                                if (err) throw err;
                
                                callback();
                            }
                        )
                    }, function(err) {

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
                    });
                })

            })


        })



    })
}

module.exports = { getIndeces }