const { listingConfigModel } = require('../../models/config')
const { marketIndexModel, listingModel } = require('../../models/market')

refreshAll = () => {
    return new Promise(( resolve, reject) => {
        listingConfigModel
        .find()
        .select('itemName')
        .exec((err, result) => {
            if(!result) {
                resolve({
                    status: 500,
                    message: `couldn't refresh market indeces`
                })
                return;
            }

            result.forEach(item => {
                var item = item._id;


                listingModel
                .find( { item } )
                .sort( { listPrice: 1} )
                .limit(1)
                .exec((err, result) => {
                    if(err) {
                        console.log(err)
                        return;
                    }

                    result.forEach(elem => {
                        var _id = item;
                        var cheapestListing = elem._id;
    

    
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

/**
 * refreshes market index 
 * @param {String} [itemName]
 */
const refreshIndex = ( itemName ) => {

    return new Promise(( resolve, reject) => {

        if(itemName === undefined)
            refreshAll().then(resolve).catch(reject)

        return;

        listingConfigModel
        .find(
            {itemName},
            (err, doc) => {

                console.log(err)
                console.log(doc)
            }
        )
    })


}

module.exports =  {
    refreshIndex
}