/**
 * @name routes\config\listings.js
 */

const express = require('express')
const router = express.Router()

const {  handleResponse } = require('../../lib')
const {  getConfigListings } = require('../../lib/config')

/**
 * @name POST::\config\listings
 * @summary gets listing config for the market
 * @param {String} searchFilter - search filter
 * @param {Number} limit - resolution of retrieved listings
 * @param {Number} offset - offset from which listings must be retrieved
 */
router.route('/')
    .post((req, res, next) => {

        getConfigListings(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { 
            handleResponse(res, result)
        })

    })
    
module.exports = router;