/**
 * @name routes\market\cheapest.js
 */

const express = require('express')
const router = express.Router()

const { handleResponse } = require('../../lib/other')
const { buyCheapestItem } = require('../../lib/market/buyCheapestItem')

/**
 * @name get::\market\listings\cheapest
 * @summary gets cheapest listings in market
 * @param {String} searchFilter - search filter
 * @param {Number} limit - resolution of retrieved listings
 * @param {Number} offset - offset from which listings must be retrieved
 */
router.route('/')
    .post((req, res, next) => {

        var { itemID, condition } = req.body;

        buyCheapestItem(itemID, condition)
        .then(result => { console.log(); handleResponse(res, result) })
        .catch(result =>  { console.log(); handleResponse(res, result) })



        
    })


module.exports = router;