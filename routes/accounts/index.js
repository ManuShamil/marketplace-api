/**
 * @name routes\accounts\index.js
 */

const express = require('express')

const accountsRouter = express.Router()

accountsRouter.use("/register", require('./create'))


module.exports = accountsRouter;