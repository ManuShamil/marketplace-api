require('./preint')

const { connectToDatabase } = require('./db')
const { findMarketExtremes } = require('./lib/market/findMarketExtremes')
const { getMarketListings } = require('./lib/market/getMarketListings')
const { getListableItemIDsbyName  } = require('./lib/config/getConfigListings')
const { refreshIndex } = require('./lib/market/refreshIndex')
const { getIndeces } = require('./lib/market/getIndeces')
const { getCheapestItem } =  require('./lib/market/getCheapestItem')
const { deleteConfig } = require('./lib/config/delete')
const { addBalance } = require('./lib/accounts/addBalance')
const { buyItem } = require('./lib/market/buyItem')
const { getMylistings } = require('./lib/accounts/getMylistings')
const { buyCheapestItem } = require('./lib/market/buyCheapestItem')


connectToDatabase()
    .then( result => {
        console.log(result);


        (async () => {
            // await findMarketExtremes("AK74").then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await getMylistings({ _id: "5fcfba582eb89539e425afa5", limit: 1, offset: 1 }).then( result => {
            //     console.log((result))
            // }).catch(result => {
            //     console.log(result)
            // })

            // await refreshIndex().then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await getIndeces().then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })


            // await buyItem("5fd2533c8851012b30f803c6").then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            
            // await addBalance("5fcf7b02608f6426908131db", 500).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await deleteConfig('5fd24fe71d3b492f50fc9635').then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })


            // await getCheapestItem('5fd250840ec5aa34948c967e').then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await buyCheapestItem('5fd250840ec5aa34948c967e', 1).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            

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

    
    process.on('unhandledRejection', (reason, p) => {
        console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
        // application specific logging, throwing an error, or other logic here
      });