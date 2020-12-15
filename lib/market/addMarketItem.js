const { listingModel } = require('../../models/market')
const { getAccountID } = require('../accounts')
const { getListableItemByName } = require('../config')

const { refreshIndex } = require('./refreshIndex')
/**
 * @summary retrieves item by item name
 * @name addMarketItem
 * @param {string} itemName 
 * @param {Number} listPrice
 * @param {string} accountID
 * @returns {object}
 */
const addMarketItem = (itemName, listPrice, accountID, condition) => {
    return new Promise((resolve, reject) => {


        if( listPrice == undefined || 
            itemName === undefined || 
            accountID == undefined) {

            reject({
                status: 400,
                message: `listPrice or itemName or accountID is undefined`
            })
            return;
        }

        /* 1. Get item from items Config */
        getListableItemByName({ itemName })
            .then((listableItem) => {
            console.log(listableItem)

            /* 2. Get account ObjectId from steam UID */
            getAccountID({ accountID })
            .then((accountObjectId) => {

                console.log(accountObjectId)

                var { minPrice, maxPrice } = listableItem;

                if( listPrice < minPrice || 
                    listPrice > maxPrice) {

                    reject({
                        status: 403,
                        message: `listPrice ${listPrice.toLocaleString()} doesn't satisfy the price constraints range (${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()})`
                    })
                    return;
                }

                var newMarketItem = 
                    new listingModel({
                        listPrice,
                        condition
                    });
                    
                newMarketItem.seller = accountObjectId;
                newMarketItem.item = listableItem._id;

                /* 3. Add Item to marketplace */
                newMarketItem.save( (err, doc) => {

                    console.log(err)

                    if(!doc) {
                        reject({
                            status: 500,
                            message: `Couldn't add ${itemName} to the marketplace (unknown reasons)`
                        })
                        return;
                    }

                    refreshIndex(listableItem._id, condition);

                        
                    resolve({
                        status: 200,
                        message: `Succesfully added item to the marketplace!`,
                        result: doc
                    })
                })


            }).catch(result => { reject(result) })
        }).catch(result => { reject(result) })

    })


}

module.exports = {
    addMarketItem
}