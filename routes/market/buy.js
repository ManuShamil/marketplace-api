

/**
 * @name routes\market\buy.js
 */

const express = require('express')
const router = express.Router()


/**
 * @name get::\market\listings\buy
 * @summary if {id} is mentioned, buys the mentioned id,
 * @param {string} id - id of item in marketlistings
 * @param {boolean} reclaim - mode is set to reclaim (balance won't be added to seller account)
 */
router.route('/buy')
    .get((req, res, next) => {

        var { _id, reclaim } = req.body



    })


module.exports = router;