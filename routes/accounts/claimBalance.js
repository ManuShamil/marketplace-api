/**
 * @name routes\accounts\claimBalance.js
 */

const express = require('express')
const router = express.Router()

const { claimBalance } = require('../../lib/accounts/claimBalance')
const { handleResponse } = require('../../lib/other')

/**
 * @name post::\accounts\balance\claim
 * @summary Claims the balance remaining in account
 * @param {string} accountID - account Object Id
 */
router.route('/claim')
    .post((req, res, next) => {

        var { accountID } = req.body
        claimBalance(accountID)
        .then((result) => {
            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })

    })


module.exports = router;