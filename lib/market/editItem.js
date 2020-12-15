const { listingModel } = require('../../models/market')
const { listingConfigModel } = require('../../models/config')
const { refreshIndex } = require('./refreshIndex')

const editItem = (params) => {
    return new Promise((resolve, reject) => {
        var { _id, listPrice } = params;

        if( _id == undefined || listPrice == undefined) {
            reject({
                status: 400,
                message: `_id or listPrice not defined.`
            })
            return;
        }


        /* find listing from the marketplace and get the config id*/
        listingModel
        .findOne({
            _id,
        },(err, doc) => {
            if(!doc) {
                reject({
                    status: 404,
                    message: `Item could not be found`
                })
                return;
            }

            var { item } = doc;

            console.log(item)

            listingConfigModel
            .findOne({ _id: item },
            (err, doc) => {
                if(!doc) {
                    reject({
                        status: 404,
                        message: `Item config could not be found`
                    })
                    return;
                }

                var configId = doc._id;
                var { minPrice, maxPrice } = doc;

                
                if( listPrice < minPrice || 
                    listPrice > maxPrice) {

                    reject({
                        status: 403,
                        message: `listPrice ${listPrice.toLocaleString()} doesn't satisfy the price constraints range (${minPrice.toLocaleString()} - ${maxPrice.toLocaleString()})`
                    })
                    return;
                }

                listingModel.findOneAndUpdate(
                    { _id },
                    { $set: { listPrice }},
                    { new: true },
                    (err, doc) => {

                        var { condition } = doc
                        refreshIndex(configId, condition);

                        resolve({
                            status: 200,
                            message: `Succesfully edited item`,
                            result: doc
                        })
                    }
                )



            })
        })



    })
}

module.exports = {
    editItem
}