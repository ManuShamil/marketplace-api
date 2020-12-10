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
 * @name GET::\accounts\listings
 * @summary Creates a new account
 * @param {string} accountID - steam64ID
 */
router.route('/')
    .get((req, res, next) => {


        getMylistings(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })
    })



module.exports = router;