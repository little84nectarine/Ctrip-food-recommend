const express = require('express')
const locationfilter = require('./locationfilter')
const stylefilter = require('./stylefilter')
const sortfilter = require('./sortfilter')
const app = new express()

//导入餐厅列表json
const restaruant = require('./mock/restruant.json')
//导入banner列表json
const bannerlist = require('./mock/banner.json')
//非菜系叶子节点列表
const notleafstyle = ["火锅系列", "外国菜", "粉面", "地方菜", "快餐简餐", "火锅", "西餐", "日本料理", "小吃", "韩国料理"]
//当前筛选是否在用
let currentfilter = ["不限", "不限", "不限", "默认"]
//所有项列表
let list = Object.values(restaruant.data)
const filterfunc = ()=>{
    let result = list;
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

})

app.listen(5500, function () {
    console.log('服务器运行在  http://127.0.0.1:5500');
});