const { listingConfigModel } = require('../../models/config')
const { marketIndexModel, listingModel } = require('../../models/market')

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

            result.forEach(item => {
                var item = item._id;


                listingModel
                .findOne( { item } )
                .sort( { listPrice: 1} )
                .limit(1)
                .exec((err, result) => {
                    if(err) {
                        console.log(err)
                        return;
                    }

                    //console.log(result)

                    var cheapestListing = result._id;
                    var _id = item;

                    marketIndexModel
                    .deleteMany({})
                    .exec((err) => {
                        if(err) {
                            console.log(err)
                            return;
                        }

                        marketIndexModel
                        .findOneAndUpdate(
                            { _id },
                            { cheapestListing: cheapestListing  },
                            { upsert: true, new: true },
                            (err, doc) => {
                                if(err) {
                                    console.log(err)
                                    return;
                                }
                            }
                        )

                    })
                    
                })

            })

            resolve({
                status: 200,
                message: `Refresh index request sent.`
            })
        })
    })
}

refreshById = (item) => {
    return new Promise((resolve, reject) => {
        listingModel
        .findOne( { item } )
        .sort( { listPrice: 1} )
        .limit(1)
        .exec((err, result) => {
            if(!result) {
                reject({
                    status: 404,
                    message: `Couldn't find listings with ${item}`
                })
                return;
            }

            var cheapestListing = result._id;
            var _id = item;
            

            marketIndexModel
            .findOneAndUpdate(
                { _id },
                { cheapestListing: cheapestListing  },
                { upsert: true, new: true },
                (err, doc) => {
                    if(err) {
                        console.log(err)
                        reject({
                            status: 500,
                            message: `Couldn't refresh index`
                        })
                        return;
                    }

                    resolve({
                        status: 200,
                        message: `Succesfully refresh market index for ${item}`,
                        result: doc
                    })

                }
            )
        })


    })
}
/**
 * refreshes market index 
 * @param {objectId} [item]
 */
const refreshIndex = ( item ) => {

    return new Promise(( resolve, reject) => {

        if(item === undefined)
            refreshAll().then(resolve).catch(reject)
        else
            refreshById(item).then(resolve).catch(reject)

        return;
    })


}

module.exports =  {
    refreshIndex
}