/**
 * @name routes\config\create.js
 */

const express = require('express')
const router = express.Router()

const { createNewListingItem, handleResponse } = require('../../lib')

/**
 * @name post::\config\create
 * @summary Creates a new listing config for the market
 * @param {string} itemName - class name of item
 * @param {string} minPrice - minimum price listable
 * @param {string} maxPrice - maximum price listable
 */
router.route('/')
    .post((req, res, next) => {

        createNewListingItem(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { 
            console.log(result); 
            handleResponse(res, result)
        })

    })
    
module.exports = router;