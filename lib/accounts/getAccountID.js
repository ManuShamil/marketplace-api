/**
 * @name lib\accounts\getAccountID.js
 */

const { accountModel } = require('../../models/account')

const getAccountID = ( body) => {
    return new Promise( (resolve, reject) => {

        var { accountID } = body;

        if(accountID === undefined) {
            reject({
                status: 400,
                message: `accountID not mentioned`
            })
            return;
        }

        accountModel
            .findOne(
            { accountID },
            (err, result) => {
                
                if(!result) {
                    reject({
                        status: 404,
                        message: `Couldn't find accountID`
                    })
                    return;
                }

                const accountID = result._id;

                resolve(accountID);
            })


    }) 
}

module.exports = {
    getAccountID
}