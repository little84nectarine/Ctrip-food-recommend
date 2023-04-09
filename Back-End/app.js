const express = require('express')
const app = new express()

const restaruant = require('./mock/restruant.json')



//返回
app.get("/restaurantList", function(req, res){
    // console.log(restaruant);

    res.json(restaruant);
})

app.listen(5500, function (){
    console.log('服务器运行在  http://127.0.0.1:5500');
});