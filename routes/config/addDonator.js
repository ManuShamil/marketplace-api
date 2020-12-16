/**
 * @name routes\config\addDonator.js
 */

const express = require('express')
const router = express.Router()

const { handleResponse } = require('../../lib')
const { addDonator } = require('../../lib/config/addDonator')

/**
 * @name post::\config\donator\add
 * @summary Creates a new listing config for the market
 * @param {string} steamUID - steam64
 * @param {Number} maxListingCount - max listing limit
 */
router.route('/donator/add')
    .post((req, res, next) => {

        addDonator(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { 
            handleResponse(res, result)
        })

    })
    
module.exports = router;