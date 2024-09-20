const redis=require('redis')
const redisClient=redis.createClient()
console.log("helooooooo")
exports.redisSetUp=async ()=>{
    redisClient.on('error',(err)=>{
        console.log(`Error during redis Setup  ${err}`)
    })
    redisClient.connect()
}

