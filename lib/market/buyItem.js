/**
 * @name lib\market\buyItem.js
 */

const { listingModel } = require('../../models/market')
const { addBalance } = require('../accounts/addBalance')
const { deleteListing } = require('./delete')


const addBalancePromise = (seller, listPrice, reclaim) => { 
    return new Promise((resolveInner, rejectInner) => {
        if(!reclaim) {

            addBalance(seller, listPrice)
            .then(resolveInner)
            .catch(rejectInner)
        } else {
            resolveInner(true)
        }
    })
}

const buyById = (_id, buyPrice, reclaim) => {
    return new Promise((resolve, reject) => {


        listingModel.findOne({ _id })
        .exec((err, doc) => {
            if(!doc) {
                reject({
                    status: 404,
                    message: `Could not find item`
                })
                return;
            }

            var { seller, listPrice, _id } = doc;

            if(!reclaim && listPrice != buyPrice) {
                reject({
                    status: 403,
                    message: `Item price changed`
                })
                return;
            }



            addBalancePromise( seller, listPrice, reclaim)
            .then(result => {
                deleteListing(_id)
                .then(result => {

                    resolve({
                        status: 200,
                        message: `Succesfully bought item`,
                        result: result.deletedItem
                    })
                }).catch(reject)

            }).catch(reject)


        })
        


    })
}

const buyItem = ( _id, buyPrice, reclaim ) => {
    return new Promise((resolve, reject) => {


        buyById(_id, buyPrice, reclaim)
            .then(resolve)
            .catch(reject)
    

    })
}


module.exports = { buyItem }