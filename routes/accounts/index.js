/**
 * @name routes\accounts\index.js
 */

const express = require('express')

const accountsRouter = express.Router()

accountsRouter.use("/register", require('./create'))
accountsRouter.use("/listings", require('./listings'))
accountsRouter.use("/balance", require('./claimBalance'))
accountsRouter.use("/summary", require('./summary'))


module.exports = accountsRouter;