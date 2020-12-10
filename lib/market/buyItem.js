/**
 * @name lib\market\buyItem.js
 */

const { listingModel, listingSchema } = require('../../models/market')

const buyCheapest = () => {
    return new Promise((resolve, reject) => {

    })
}

const buyItem = ( _id ) => {
    return new Promise((resolve, reject) => {

        if(_id === undefined) {
            buyCheapest()
            .then(result => { })
            .catch(result => { })
        } else {
            buyById(_id)
            .then(result => { })
            .catch(result => { })
        }

    })
}


module.exports = { buyItem }