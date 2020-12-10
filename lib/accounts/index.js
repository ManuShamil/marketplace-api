/**
 * @summary Index for accounts lib
 * @name lib\accounts\index.js
 */


const { registerAccount } = require('./register')
const { getAccountID } = require('./getAccountID')



module.exports = { getAccountID, registerAccount };