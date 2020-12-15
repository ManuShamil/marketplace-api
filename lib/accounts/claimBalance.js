const { accountModel } = require('../../models/account')
const { getAccountID } = require('./getAccountID')

const claimBalance = (accountID) => {
    return new Promise((resolve, reject) => {

        getAccountID( { accountID })
        .then( _id => {
            accountModel
            .findOneAndUpdate(
                {_id},
                { $set: {
                    accountBalance: 0
                }},
                (err, doc) => {
                    if(!doc) {
                        console.log(err)
                        reject({
                            status: 404,
                            message: `Account not found`
                        })
                        return;
                    }
    
                    resolve({
                        status: 200,
                        message: `Succesfully claimed balance`,
                        result: doc
                    })
                }
            )
        })
        .catch(reject)



    })
}

module.exports = {
    claimBalance
}