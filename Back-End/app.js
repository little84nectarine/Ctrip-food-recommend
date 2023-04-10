const express = require('express')
const app = new express()

//导入餐厅列表json
const restaruant = require('./mock/restruant.json')
//导入banner列表json
const bannerlist = require('./mock/banner.json')


//返回餐厅列表
app.get("/restaurantList", function(req, res){
    let list = Object.values(restaruant.data)
    res.json(list);
})

//返回餐厅详情页
app.post("/restaurantdetail",express.json(),function(req,res){
    let restlen = Object.keys(restaruant.data).length
    let id = req.body.id
    if(id>0 && id<=restlen){
        let result = restaruant.data[id]
        res.json(result)
    }else{
        res.send(404)
        return
    }
})

//返回banner列表
app.get("/bannerList", function(req, res){
    res.json(bannerlist.data);
})

app.listen(5500, function (){
    console.log('服务器运行在  http://127.0.0.1:5500');
});