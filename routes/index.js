/**
 * @name routes\index.js
 */

module.exports = (app) => {
    app.use("/market", require("./market")),
    app.use("/account", require('./accounts')),
    app.use("/config", require('./config'))
}