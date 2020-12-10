/**
 * @name lib\config\getItembyName.js
 */

const { listingConfigModel } = require('../../models/config');

/**
 * @summary retreives item by item name
 * @name getListableItemByName
 * @param {object} itemName 
 * @returns {object}
 */
const getListableItemByName = (body) => {
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
                        message: `Couldn't find item`
                    })
                    return;
                }

                resolve(result);
            })
        
    })
}

module.exports = {
    getListableItemByName
}