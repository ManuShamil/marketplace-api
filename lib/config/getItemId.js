/**
 * @name lib\config\getItemId.js
 */


const { listingConfigModel } = require('../../models/config');

/**
 * @summary retreives itemID of item name
 * @name getListableItemID
 * @param {object} itemName 
 * @returns {Number} 
 */
const getListableItemID = (body) => {
    return new Promise( (resolve, reject) => {

        var { itemName } = body;

        if(itemName === undefined) {
            reject({
                status: 400,
                message: `itemName not mentioned`
            })
            return;
        }

        listingConfigModel
            .findOne( 
            { itemName },
            (err, result) => {

                if(!result) {
                    reject({
                        status: 404,
                        message: `Couldn't find item ID`
                    })
                    return;
                }

                const itemID = result._id;

                resolve(itemID);
            })
        
    })
}

module.exports = {
    getListableItemID
}