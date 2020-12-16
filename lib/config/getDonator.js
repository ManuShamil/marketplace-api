/**
 * @name lib\config\getDonator.js
 */


const { donatorConfigModel } = require('../../models/config');

/**
 * @summary retreives max listings if donator
 * @name getDonator
 * @param {string} steamUID 
 */
const getDonator = (body) => {
    return new Promise( (resolve, reject) => {

        var { steamUID } = body;

        if(steamUID === undefined) {
            reject({
                status: 400,
                message: `steamUID not mentioned`
            })
            return;
        }

        donatorConfigModel
            .findOne( 
            { steamUID },
            { _id: 0, __v: 0, steamUID: 0},
            (err, result) => {

                if(!result) {
                    resolve({
                        status: 200,
                        message: `Couldn't find steam UID`,
                        maxListingCount: 10
                        
                    })
                    return;
                }

                var { maxListingCount } = result;

                resolve({
                    status: 200,
                    message: `Found steam ID`,
                    maxListingCount
                });
            })
        
    })
}

module.exports = {
    getDonator
}