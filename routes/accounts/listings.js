/**
 * @name routes\accounts\listings.js
 */

const express = require('express')
const router = express.Router()

const { 
    getMylistings
} = require('../../lib/accounts/getMylistings');
const { handleResponse } = require('../../lib/other');

/**
 * @name POST::\accounts\listings
 * @summary Gets listings linked to the account
 * @param {string} accountID - steam64ID
 */
router.route('/')
    .post((req, res, next) => {


        getMylistings(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })
    })



module.exports = router;