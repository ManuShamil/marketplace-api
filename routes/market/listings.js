/**
 * @name routes\market\listings.js
 */

const express = require('express')
const router = express.Router()

const { handleResponse } = require('../../lib')
const { getMarketListings } = require('../../lib/market')

/**
 * @name get::\market\listings
 * @summary gets items listed in market
 * @param {String} searchFilter - search filter
 * @param {Number} limit - resolution of retrieved listings
 * @param {Number} offset - offset from which listings must be retrieved
 */
router.route('/')
    .get((req, res, next) => {

        getMarketListings(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { 
            console.log(result); 
            handleResponse(res, result)
        })

    })


module.exports = router;