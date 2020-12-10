/**
 * @name lib\accounts\register.js
 */

const { accountModel } = require('../../models/account')

/**
 * @summary Registers new account
 * @name registerAccount
 * @param {string} accountID 
 * @returns {object}
 */
const registerAccount = (body) => {
    return new Promise((resolve, reject) => {

        var { accountID } = body;

        if( accountID === undefined) {
            reject({
                status: 400,
                message: "accountID not defined"
            })
            return;
        }

        var newAccount = new accountModel(body);

        newAccount
        .save((err, doc) => {
            if(!doc) {
                reject({
                    status: 500,
                    message: `Could not create new account with steam64ID: ${accountID}`
                })
                return;
            }

            resolve({
                status: 200,
                message: `Succesfully created new account with steam64ID: ${accountID}`,
                result: doc
            })
        })



    })
}

module.exports = {
    registerAccount
}