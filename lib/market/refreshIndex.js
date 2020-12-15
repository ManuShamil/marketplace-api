const { listingConfigModel } = require('../../models/config')
const { marketIndexModel, listingModel } = require('../../models/market')

const { getIndeces } = require('./getIndeces')
refreshAll = () => {
    return new Promise(( resolve, reject) => {
        listingConfigModel
        .find()
        .select('itemName')
        .exec((err, result) => {
            if(!result) {
                reject({
                    status: 500,
                    message: `Couldn't refresh market indeces`
                })
                return;
            }

            marketIndexModel
            .deleteMany({})
            .exec((err, doc) => {
                if(!doc) {
                    reject({
                        status: 500,
                        message: `Couldn't refresh market indeces`
                    })
                    return;
                }


                result.forEach(item => {
                    var item = item._id;
    
    
                    [0, 1, 2].forEach(condition => {
                        
                        listingModel
                        .countDocuments({ item, condition },
                            (err, stock) => {
                                listingModel
                                .findOne( { item, condition } )
                                .sort( { listPrice: 1} )
                                .limit(1)
                                .exec((err, result) => {
                                    if(!result) {
                                        return;
                                    }
            
                                    var cheapestListing = result._id;
                                    var _id = item;
                                    var listPrice = result.listPrice;
            
                                    if(err) {
                                        return;
                                    }
            
                                    var newIndex = new marketIndexModel({
                                        item: _id,
                                        cheapestListing: cheapestListing,
                                        condition,
                                        stock,
                                        listPrice
                                    })
                                    
                                    newIndex.save(
                                        (err, doc) => {
                                            if(err) {
                                                return;
                                            }
                                        }
                                    )
                                })
                            });

                    });
    
                })

            });


            resolve({
                status: 200,
                message: `Refresh index request sent.`
            })
        })
    })
}

refreshById = (item, condition) => {
    return new Promise((resolve, reject) => {
        marketIndexModel
        .deleteOne(
            { item, condition },
            (err, res) => {
            
                if(err) {
                    reject({
                        status: 500,
                        message: `Couldn't refresh market indeces`
                    })
                    return;
                }

                listingConfigModel
                .find({ _id: item},
                (err, result) => {
                    if(!result) {
                        reject({
                            status: 404,
                            message: `Item not found in configs`
                        })
                        return;
                    }

                    listingModel
                    .countDocuments({ item, condition },
                        (err, stock) => {

                            listingModel
                            .findOne( { item, condition } )
                            .sort( { listPrice: 1} )
                            .limit(1)
                            .exec((err, result) => {
                                if(!result) {
                                    reject({
                                        status: 404,
                                        message: `Couldn't find listings in marketplace for required query`
                                    })
                                    return;
                                }
        
                                var cheapestListing = result._id;
                                var listPrice = result.listPrice;
        
                                new marketIndexModel({
                                    item,
                                    cheapestListing,
                                    condition,
                                    stock,
                                    listPrice
                                })
                                .save((err, result) => {
                                    if(!result) {
                                        console.log(err)
                                        reject({
                                            status: 500,
                                            message: `Couldn't refresh market index while saving new index`
                                        })
                                        return;
                                    }

                                    resolve({
                                        status: 200,
                                        message: `Succesfully refreshed index`
                                    })
 
                                })
        
                            })
                        } )

                    
                })

            })
    })
}
/**
 * refreshes market index 
 * @param {objectId} [item]
 */
const refreshIndex = ( item, condition ) => {

    return new Promise(( resolve, reject) => {

        if(item === undefined)
            refreshAll().then(resolve).catch(reject)
        else
            refreshById(item, condition).then(resolve).catch(reject)

        return;
    })


}

module.exports =  {
    refreshIndex
}