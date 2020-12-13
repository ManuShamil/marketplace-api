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
const { claimBalance } = require('./lib/accounts/claimBalance')
const { addMarketItem } = require('./lib/market/addMarketItem')
const { editItem  } = require('./lib/market/editItem')
const { getAccountSummary } = require('./lib/accounts/summary')
const { addDonator } = require('./lib/config/addDonator')
const { getDonator } = require('./lib/config/getDonator')


function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

connectToDatabase()
    .then( result => {
        console.log(result);


        (async () => {
            // await findMarketExtremes("AK74").then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            await getMylistings({ _id: "5fd63333b781020d9c5f941c", limit: 10, offset: 0 }).then( result => {
                console.log((result))
            }).catch(result => {
                console.log(result)
            })

            // for(var i =0; i < 1000; i++)
            //     await addMarketItem("AK", getRandomInt(0, 5000), "76561198213882024", getRandomInt(0, 2))
            //     .then( result => {
            //         console.log(result)
            //     }).catch(result => {
            //         console.log(result)
            //     })

            // await editItem({ _id: "5fd3248187a26d0b50969b76", listPrice : 1999}).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await refreshIndex().then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await getIndeces({ limit: 2, offset: 0, searchFilter: ""}).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })


            // await buyItem("5fd2533c8851012b30f803c6").then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await claimBalance("5fd2abfb8936ef32bcfff3ae").then( result => {
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

            // await getAccountSummary( { accountID: '76561198213882024'}).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await addDonator( { steamUID: '76561198213882024'}).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })

            // await getDonator( { steamUID: '76561198213882024'} ).then( result => {
            //     console.log(result)
            // }).catch(result => {
            //     console.log(result)
            // })
            
            // await buyCheapestItem('5fd2abd38936ef32bcfff3ad', 1).then( result => {
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