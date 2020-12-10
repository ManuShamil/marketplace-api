/**
 * @name lib\config\create.js
 */

const { listingConfigModel } = require('../../models/config')

/**
 * @summary retreives item by item name
 * @name createNewListingItem
 * @param {object} itemName 
 * @returns {object}
 */

const createNewListingItem = (body) => {
    return new Promise((resolve, reject) => {
        var newConfigListItem = new listingConfigModel(body)

        const { itemName } = body;

        newConfigListItem
        .save((err, doc) => {

            if(!doc) {
                reject({
                    status: 500,
                    message: `Could not create new config`
                })
                return;
            }

            resolve({
                status: 200,
                message: `Succesfully created new item ${itemName}`,
                result: doc
            })
        })
    })


    
}

module.exports = {
    createNewListingItem
}