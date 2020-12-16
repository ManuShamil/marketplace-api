

/**
 * @name routes\market\buy.js
 */

const express = require('express')
const router = express.Router()

const { buyItem } = require('../../lib/market/buyItem')
const { handleResponse } = require('../../lib/other')


/**
 * @name post::\market\buy
 * @summary if {id} is mentioned, buys the mentioned id,
 * @param {string} id - id of item in marketlistings
 * @param {boolean} reclaim - mode is set to reclaim (balance won't be added to seller account)
 */
router.route('/')
    .post((req, res, next) => {


        var { _id, listPrice, reclaim } = req.body

        buyItem(_id, listPrice, reclaim)
        .then(result => { handleResponse(res, result) })
        .catch(result =>  { handleResponse(res, result) })




    })


module.exports = router;