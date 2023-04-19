const express = require('express')
const locationfilter = require('./filterfunction/locationfilter')
const stylefilter = require('./filterfunction/stylefilter')
const sortfilter = require('./filterfunction/sortfilter')
const multifilter = require('./filterfunction/multifilter')
const app = new express()

//导入餐厅列表json
const restaruant = require('./mock/restruant.json')
const userComments = require('./mock/user.json')
//导入banner列表json
const bannerlist = require('./mock/banner.json')
//非菜系叶子节点列表
const notleafstyle = ["火锅系列", "外国菜", "粉面", "地方菜", "快餐简餐", "火锅", "西餐", "日本料理", "小吃", "韩国料理"]
//当前筛选是否在用
let currentfilter = ["不限", "不限", [[],[]], "默认"]
//所有项列表
let list = Object.values(restaruant.data)
const filterfunc = ()=>{
    let result = Object.values(restaruant.data);
    result = multifilter(currentfilter[2][0],currentfilter[2][1],result)
    result = locationfilter(currentfilter[0],result)
    result = stylefilter(currentfilter[1],result)
    result = sortfilter(currentfilter[3],result)
    return result
}
//返回餐厅列表
app.get("/restaurantList", function (req, res) {
    res.json(list);
})

//返回餐厅详情页
app.post("/restaurantdetail", express.json(), function (req, res) {
    let restlen = list.length
    let id = req.body.id
    if (id > 0 && id <= restlen) {
        let result = restaruant.data[id]
        // 将前三条评论数据一起返回
        let comments = userComments.data[id].comments
        if(comments.length <= 3){
            result.comments = userComments.data[id].comments
        }else{
            let temp = []
            for(let i = 0; i < 3; i++){
                temp.push(comments[i])
            }
            result.comments = temp
        }
        res.json(result)
    } else {
        res.send(404)
        return
    }
})

//返回餐厅详情页
app.post("/restComments", express.json(), function (req, res) {
    let restlen = list.length
    let id = req.body.id
    if (id > 0 && id <= restlen) {
        let result = restaruant.data[id]
        res.json(result)
    } else {
        res.send(404)
        return
    }
})

//返回banner列表
app.get("/bannerList", function (req, res) {
    res.json(bannerlist.data);
})

//单选筛选
//位置
app.get("/locationfilter", function (req, res) {
    let str = req.query.filter
    currentfilter[0] = str
    res.json(filterfunc())
})
//菜系
app.get("/stylefilter", function (req, res) {
    let str = req.query.filter
    currentfilter[1] = str
    res.json(filterfunc())
})
//排序
app.get("/sortfilter", function (req, res) {
    let str = req.query.filter
    currentfilter[3] = str
    res.json(filterfunc())
})

//多选筛选
app.post("/multifilter", express.json(), function (req, res) {
    let rankarr = req.body?.rank
    let pricearr = req.body?.price
    if(rankarr){
        currentfilter[2][0] = rankarr
    }
    if(pricearr){
        currentfilter[2][1] = pricearr
    }
    res.json(filterfunc())
})

app.listen(5500, function () {
    console.log('服务器运行在  http://127.0.0.1:5500');
});