/**
 * @name lib\config\getConfigListings.js
 */


const { listingConfigModel } = require('../../models/config');

const getListableItemIDsbyName = (searchFilter) => {
    return new Promise((resolve, reject) => {

        getConfigListings({searchFilter})
            .then(result => {
                var itemIDs = [];
                var { result } = result;

                result.forEach( item => {
                    var { _id  } = item 

                    itemIDs.push(_id)
                })

                resolve({
                    status: 200,
                    message: `Succesfully retrieved itemIDs for searchFilter '${searchFilter}'`,
                    result: itemIDs
                })
            })
            .catch(reject)
    })
}

/**
 * @summary retrieves all items from config listings
 * @name getConfigListings
 * @param {String} searchFilter
 * @param {Number} limit
 * @param {Number} offset 
 * @returns {Array}
 */
const getConfigListings = (body) => {
    return new Promise((resolve, reject) => {

        var { searchFilter, limit, offset } = body;

        if( searchFilter === undefined) searchFilter = ""

        /**
         * @summary possible test cases
         * @tutorial searchFilter (undefined)
         */
        listingConfigModel.find({
            itemName: {
                $regex: searchFilter,
                $options: "i"
            }
        })
        .skip(offset)
        .limit(limit)
        .exec((err, doc) => {
            if(err) {
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
                result: doc
            })
        })

    })
}

module.exports = {
    getConfigListings,
    getListableItemIDsbyName
}