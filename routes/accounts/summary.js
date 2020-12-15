/**
 * @name routes\accounts\listings.js
 */

const express = require('express')
const router = express.Router()

const { 
    getAccountSummary
} = require('../../lib/accounts/summary');

const { handleResponse } = require('../../lib/other');

/**
 * @name POST::\account\summary
 * @summary Gets summary of account
 * @param {string} accountID - steam64ID
 */
router.route('/')
    .post((req, res, next) => {


        getAccountSummary(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })
    })



module.exports = router;