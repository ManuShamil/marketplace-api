/**
 * @name routes\market\indeces.js
 */

const express = require('express')
const router = express.Router()

const { getIndeces } = require('../../lib/market/getIndeces')
const { handleResponse } = require('../../lib/other')

/**
 * @name get::\market\indeces
 * @summary gets market indeces
 * @param {String} searchFilter - search filter
 * @param {Number} limit - resolution of retrieved listings
 * @param {Number} offset - offset from which listings must be retrieved
 */
router.route('/')
    .post((req, res, next) => {

        console.log(req.body)

        getIndeces(req.body)
        .then((result) => handleResponse(res, result) )
        .catch(result =>  handleResponse(res, result) )

    })


module.exports = router;