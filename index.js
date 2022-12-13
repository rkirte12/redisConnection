const express = require("express");
const app = express();
const PORT = 8080;

const redis = require("redis");
const redisClient = redis.createClient(6379, '127.0.0.1');

redisClient.connect();
redisClient.on("connect", (err) => {
    console.log("Connected Redis");
})

app.get("/home", async(req, res) => {
    let keyName = "hetHome";
    let getCacheData = await redisClient.get(keyName);
    let result = {
        id: 1001,
        name: "Rohit Pandit"
    }

    var responseArray = '';
    
    if(getCacheData){
        responseArray = getCacheData;
    }else{
        redisClient.set(keyName, JSON.stringify(result))
        responseArray = getCacheData;
    }

    return res.status(200).json({status: "success", message: "OK.", data: responseArray});
});

app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
})