const { accountModel } = require('../../models/account')

const claimBalance = (_id) => {
    return new Promise((resolve, reject) => {

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
}

module.exports = {
    claimBalance
}