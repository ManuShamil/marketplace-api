/**
 * @name lib\accounts\summary.js
 */

const { accountModel } = require('../../models/account')
const { getDonator } = require('../config/getDonator')

const getAccountSummary = (params) => {
    return new Promise((resolve, reject) => {

        var { accountID } = params;

        accountModel
        .findOne( { accountID } , { __v: 0},
            (err, doc) => {
    
                if(!doc) {
                    reject({
                        status: 404,
                        message: `Could not find account with ${accountID}`
                    })
                    return;
                }

                getDonator({ steamUID : accountID })
                .then(result => {

                    var { maxListingCount } = result;

                    doc = doc.toObject()
                    doc["maxListingCount"] = maxListingCount;


                    resolve({
                        status: 200,
                        message: `success`,
                        result: doc
                    })
                }).catch(() => {
                    
                    reject({
                        status: 404,
                        message: `Could not get details`
                    })
                })

    

                
    
            })

    })


}

module.exports = { getAccountSummary }