const { listingModel, listingSchema } = require('../../models/market')
const { listingConfigModel } = require('../../models/config')

const { getListableItemByName } = require('../config/getItembyName')


const processResults = (err, doc) => {
    return new Promise((resolve, reject) => {
        if(err) {
            console.log(err)
            reject({
                status: 500,
                message: `Could not fetch items`
            })
            return;
        }

        listingModel
        .populate(doc, { 
            path: '_id', 
            model: 'listingconfigs',
            select: {
                _id: 0, __v: 0
            }
        },
        (err, doc) => {
            if(err) {
                console.log(err)
                reject({
                    status: 500,
                    message: `Could not fetch items`
                })
                return;
            }

            var i = 0;
            doc.forEach( item => {
                doc[i]["itemName"] = item._id.itemName

                delete doc[i]["_id"]
                i++;
            })



            resolve({
                status: 200,
                message: `Fetched ${doc.length} items succesfully`,
                result: doc
            });
        })
    })
}

const findAll = () => {
    return new Promise((resolve, reject) => {
        listingModel.aggregate([
            {
                $group: {
                    _id: "$item",
                    min: { $min: "$listPrice"},
                    max: { $max: "$listPrice"},
                    count: { $sum: 1}
                }
            }
        ])
        .exec((err, doc) => {
            processResults(err, doc)
            .then(resolve)
            .catch(reject)
        })
    })
}

const findbyItemName = (itemName) => {
    return new Promise((resolve, reject) => {

        getListableItemByName({ itemName })
        .then( item => {

            var item = item._id;
            
            listingModel.aggregate([
                {
                    $match: {
                        item: item
                    }
                },
                {
                    $group: {
                        _id: "$item",
                        min: { $min: "$listPrice"},
                        max: { $max: "$listPrice"},
                        count: { $sum: 1}
                    }
                }
            ])
            .exec((err, doc) => {
                processResults(err, doc)
                .then(resolve)
                .catch(reject)
            })
        })
        .catch( reject );

    })
}

const findMarketExtremes = ( itemName ) => {
    return new Promise((resolve, reject) => {

        if(itemName === undefined) {
            findAll()
                .then(resolve)
                .catch(reject)
        } else {
            findbyItemName(itemName)
                .then(resolve)
                .catch(reject)
        }
    })

}

module.exports = {
    findMarketExtremes
}