/**
 * @name routes\market\index.js
 */

const express = require('express')

const marketRouter = express.Router()

marketRouter.use("/listing/create", require('./create'))
marketRouter.use("/listings", require('./listings'))
marketRouter.use("/config", require('./config'))
marketRouter.use("/extremes", require('./extreme'))


module.exports = marketRouter;