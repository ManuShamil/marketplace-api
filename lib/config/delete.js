/**
 * @name lib\config\delete.js
 */

const { listingConfigModel } = require('../../models/config')

const deleteConfig = (_id) => {
    return new Promise((resolve, reject) => {
        listingConfigModel.deleteOne({
            _id
        }, (err, doc) => {
            console.log(err)
            console.log(doc)
        })
    })
}

module.exports = {
    deleteConfig
}