/**
 * @name routes\config\index.js
 */

const express = require('express')

const configRouter = express.Router()

configRouter.use("/create", require('./create'))
configRouter.use("/listings", require('./listings'))
configRouter.use("/donator", require('./addDonator'))


module.exports = configRouter;