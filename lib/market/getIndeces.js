const { marketIndexModel, listingModel } = require('../../models/market')

const async = require('async')

const getIndeces = () => {
    return new Promise((resolve, reject) => {

        marketIndexModel.find()
        .select({ __v: 0, _id: 0})
        .populate('item', 'itemName -_id')
        .populate('cheapestListing', '-__v -item')
        .exec((err, doc) => {
            if(!doc) {
                resolve({
                    status: 500,
                    message: `Could not send indeces`
                })
                return;
            }

            async.forEach(doc,function(item,callback) {
                listingModel
                .populate(item.cheapestListing, 
                    { path: 'seller', select: 'accountID -_id'},
                    (err, output) => {
                        if (err) throw err;
        
                        callback();
                    }
                )
            }, function(err) {


                resolve({
                    status: 200,
                    message: `Succesfully retrieved items`,
                    result: doc
                })
            });



        })

    })
}

module.exports = { getIndeces }