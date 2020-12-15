/**
 * @name lib\config\addDonator.js
 */

const { donatorConfigModel } = require('../../models/config')

/**
 * @summary retreives item by item name
 * @name addDonator
 * @param {object} itemName 
 * @returns {object}
 */

const addDonator = (body) => {
    return new Promise((resolve, reject) => {

        var { steamUID } = body;
        var newDonator = new donatorConfigModel(body)

        newDonator
        .save((err, doc) => {

            if(!doc) {
                reject({
                    status: 500,
                    message: `Could not add new donator `
                })
                return;
            }

            resolve({
                status: 200,
                message: `Succesfully created new donator config with steam64: ${steamUID}`,
                result: doc
            })
        })
    })


    
}

module.exports = {
    addDonator
}