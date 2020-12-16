/**
 * @name routes\accounts\create.js
 */

const express = require('express')
const router = express.Router()

const { 
    handleResponse,
    registerAccount
} = require('../../lib')

/**
 * @name post::\accounts\create
 * @summary Creates a new account
 * @param {string} accountID - steam64ID
 */
router.route('/')
    .post((req, res, next) => {

        registerAccount(req.body)
        .then((result) => {

            handleResponse(res, result) 
        })
        .catch(result => { handleResponse(res, result) })

    })


module.exports = router;