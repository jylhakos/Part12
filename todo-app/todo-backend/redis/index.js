const redis = require('redis')
const { promisify } = require('util')
const { REDIS_URL } = require('../util/config')

let getAsync
let setAsync
let incAsync

if (!REDIS_URL) {
  const redisIsDisabled = () => {
    console.log('No REDIS_URL set, Redis is disabled')
    return null
  }
  getAsync = redisIsDisabled
  setAsync = redisIsDisabled
  incAsync = redisIsDisabled
} else {

  const client = redis.createClient({
    url: REDIS_URL
  })

  client.on('Error', (err) => console.log('Error', err));

  getAsync = promisify(client.get).bind(client);

  setAsync = promisify(client.set).bind(client);  

  incAsync  = promisify(client.incr).bind(client);  
}

module.exports = {
  getAsync,
  setAsync,
  incAsync
}