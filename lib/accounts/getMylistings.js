const async = require('async')

const { accountModel } = require('../../models/account')
const { listingConfigModel } = require('../../models/config')
const { listingModel } = require('../../models/market')

const getMylistings = (params) => {
    return new Promise((resolve, reject) => {

        var { _id, limit, offset} = params;

        console.log(limit)

        accountModel
        .findOne( { _id })
        .select( { Listings: 1, _id: 0})
        .slice('Listings', [offset, limit])
        .populate('Listings', ('-seller -__v'))
        .exec((err, doc) => {
            if(!doc) {
                reject({
                    status: 404,
                    message: `Could not find account`
                })
                return;
            }

            async.forEach(doc.Listings, (listing, callback) => {
                listingModel
                .populate(listing, 
                    { path: 'item', select: 'itemName -_id'},
                    (err, output) => {
                        if (err) throw err;
        
                        callback();
                    }
                )
            }, function(err) {

                resolve({
                    status: 200,
                    message: `Retrieved account listings`,
                    result: doc
                })
            });
        })

    })
}

module.exports = { 
    getMylistings
}