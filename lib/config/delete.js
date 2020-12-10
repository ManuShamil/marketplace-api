/**
 * @name lib\config\delete.js
 */

const { listingConfigModel } = require('../../models/config')

const deleteConfig = (_id) => {
    return new Promise((resolve, reject) => {
        listingConfigModel.deleteOne({
            _id
        }, (err, doc) => {
            if(!doc) {
                reject({
                    status: 500,
                    message: `Could not delete item config`
                })
                return;
            }

            resolve({
                status: 200,
                message: `Succesfully deleted item config`
            })
        })
    })
}

module.exports = {
    deleteConfig
}