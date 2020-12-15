
const { accountModel } = require('../../models/account')

const addBalance = (_id, amount) => {
    return new Promise((resolve, reject) => {

        console.log("addBalance")
        accountModel
        .findOneAndUpdate( 
            { _id }, 
            { $inc: { accountBalance: amount}},
            { new: true },
            (err, result) => {
                if(!result) {
                    reject({
                        status: 500,
                        message: `Could not add balance to account ${_id}`
                    })
                    return;
                }

                resolve({
                    status: 200,
                    message: `Succesfully added balance to account ${_id}`,
                    result
                })
            })

    })
}

module.exports = {
    addBalance
}