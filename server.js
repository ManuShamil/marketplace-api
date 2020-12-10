/**
 * @name server.js
 */

require('./preint')

const PORT = 3000 || process.env.PORT

const express = require('express')
const morgan = require('morgan')
const { connectToDatabase } = require('./db')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

require("./routes")(app)


connectToDatabase()
    .then(result => {
        app.listen(PORT, () => console.log(`\n*** Market server running on PORT ${PORT} ***`))
    }).catch(result => {
        console.log(result.message)
    })
