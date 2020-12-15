
/**
 * @summary global function to handle every response
 * @param {Object} response 
 * @param {Object} result 
 */
const handleResponse = (response, result) => {

    console.log(result)
    response.status(result.status)
    .json(result)
    .end();   
}

module.exports = {
    handleResponse
}