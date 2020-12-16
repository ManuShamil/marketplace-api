/**
 * @name routes\market\edit.js
 */

const express = require('express')
const router = express.Router()

const { editItem } = require('../../lib/market/editItem')
const { 
    handleResponse
} = require('../../lib')

/**
 * @name post::\market\edit
 * @summary edit existing item
 * @param {string} _id - id of item to edit
 * @param {Number} listPrice - price to edit
 */
router.route('/')
    .post((req, res, next) => {

        editItem(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })

    })

module.exports = router
