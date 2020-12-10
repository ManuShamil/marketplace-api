require('./preint')

const { connectToDatabase } = require('./db')
const { findMarketExtremes } = require('./lib/market/findMarketExtremes')
const { getMarketListings } = require('./lib/market/getMarketListings')
const { getListableItemIDsbyName  } = require('./lib/config/getConfigListings')
const { refreshIndex } = require('./lib/market/refreshIndex')
const { getCheapestItem } =  require('./lib/market/getCheapestItem')
const { deleteConfig } = require('./lib/config/delete')


connectToDatabase()
    .then( result => {
        console.log(result);

        (async () => {
            // await findMarketExtremes("AK74").then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            await deleteConfig('5fcfbdbc674ac12668316987').then( result => {
                console.log(result)
            }).catch(result => {
                console.log(result)
            })


            await getCheapestItem('5fcf7c32ec262d155467ec63').then( result => {
                console.log(result)
            }).catch(result => {
                console.log(result)
            })

            

            // await getMarketListings({
            //     searchFilter: "AK",
            //     condition: 0,
            //     sort: -1
            // })
            // .then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

        })();


    })
    .catch( result => {
        console.log(`Couldn't execute tests :`)
        console.log(`reason: ${result.message}`)
    })

    