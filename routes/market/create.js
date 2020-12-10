/**
 * @name routes\market\create.js
 */

const express = require('express')
const router = express.Router()

const { 
    handleResponse,
    addMarketItem
} = require('../../lib')

/**
 * @name post::\market\listings
 * @summary Creates a new listing in to market
 * @param {object} account - account under which listing should be placed
 * @param {string} item - ID of item from available listings
 */
router.route('/')
    .post((req, res, next) => {

        var { itemName, listPrice, accountID } = req.body;
        addMarketItem(itemName, listPrice, accountID)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { console.log(result); handleResponse(res, result) })

    })

module.exports = router
