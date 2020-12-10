/**
 * @name lib\market\delete.js
 */

const { listingModel } = require('../../models/market')
const { accountModel } = require('../../models/account')
const { refreshIndex } = require('./refreshIndex')

const deleteListing = (_id) => {
    return new Promise((resolve, reject) => {

        listingModel.findOneAndDelete({
            _id
        }, (err, doc) => {
            if(!doc) {
                reject({
                    status: 500,
                    message: `Could not delete listing`
                })
                return;
            }


            var { seller, item, condition } = doc;

            accountModel
            .findOneAndUpdate(
                {   _id: seller },
                {   $pull: { Listings: _id },
                    $inc: { listingsCount: -1}  },
                {   new: true },
                (err, doc) => {
                    if(!doc) {
                        reject({
                            status: 500,
                            message: `seller not found`
                        })
                        return;
                    }

                    refreshIndex( item, condition );

                    resolve({
                        status: 200,
                        message: `Succesfully deleted listing`
                    })


                }
            )


        })
    })
}

module.exports = {
    deleteListing
}