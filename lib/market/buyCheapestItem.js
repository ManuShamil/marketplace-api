const { marketIndexModel, listingModel } = require('../../models/market')
const { buyItem } = require('./buyItem')

const buyCheapest = (item, condition) => {
    return new Promise((resolve, reject) => {
        marketIndexModel.findOne({ item, condition})
        .exec((err, result) => {
            if(!result) {
                reject({
                    status: 404,
                    message: `Could not find any item with given query`
                })
                return;
            }

            var { cheapestListing } = result;
            
            buyItem(cheapestListing, false)
            .then(resolve)
            .catch(reject)

        })
    })
}

const buyCheapestItem = ( itemID, condition ) => {
    return new Promise((resolve, reject) => {

        buyCheapest(itemID, condition)
            .then(resolve)
            .catch(reject)
    

    })
}


module.exports = { buyCheapestItem }