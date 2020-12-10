/**
 * @name routes\market\chrapest.js
 */

const express = require('express')
const router = express.Router()


/**
 * @name get::\market\listings\cheapest
 * @summary gets cheapest listings in market
 * @param {String} searchFilter - search filter
 * @param {Number} limit - resolution of retrieved listings
 * @param {Number} offset - offset from which listings must be retrieved
 */
router.route('/cheapest')
    .get((req, res, next) => {

    })


module.exports = router;