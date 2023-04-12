const express = require('express')
const app = new express()

//导入餐厅列表json
const restaruant = require('./mock/restruant.json')
//导入banner列表json
const bannerlist = require('./mock/banner.json')
//非菜系叶子节点列表
const notleafstyle = ["火锅系列", "外国菜", "粉面", "地方菜", "快餐简餐", "火锅", "西餐", "日本料理", "小吃", "韩国料理"]


//返回餐厅列表
app.get("/restaurantList", function (req, res) {
    let list = Object.values(restaruant.data)
    res.json(list);
})

//返回餐厅详情页
app.post("/restaurantdetail", express.json(), function (req, res) {
    let restlen = Object.keys(restaruant.data).length
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
    let list = Object.values(restaruant.data)
    let str = req.query.filter
    if (str === "不限") {
        res.json(list);
        return
    } else if (str.includes("区")) {
        let result = list.filter(item => {
            return item.generalPosition.startsWith(str)
        })
        res.json(result)
        return
    } else {
        let dis = 0;
        if (str.includes("公里")) {
            dis = parseFloat(str) * 1000
        } else {
            dis = parseFloat(str)
        }
        let result = list.filter(item => {
            return item.distance <= dis
        })
        res.json(result);
        return
    }
})
//菜系
app.get("/stylefilter", function (req, res) {
    let list = Object.values(restaruant.data)
    let str = req.query.filter
    if (str === "不限") {
        res.json(list);
        return
    } else if (notleafstyle.includes(str)) {
        //根据具体的一级菜系去判断
        switch (str) {
            case "火锅系列" || "火锅":
                res.json(list.filter(item=>{
                    return item.style.includes("火锅")
                }));
                break;
            case "外国菜":
                res.json(list.filter(item=>{
                    return ["法国菜","意大利菜","披萨","俄罗斯菜","寿司","居酒屋","日式火锅","韩国烤肉","韩式火锅","西式快餐"].includes(item.style)
                }));
                break;
            case "粉面":
                res.json(list.filter(item=>{
                    return ["面食","米粉/米线"].includes(item.style)
                }));
                break;
            case "地方菜":
                res.json(list.filter(item=>{
                    return ["江浙菜","川菜","粤菜","湘菜"].includes(item.style)
                }));
                break;
            case "快餐简餐":
                res.json(list.filter(item=>{
                    return ["西式快餐","中式快餐"].includes(item.style)
                }));
                break;
            case "西餐":
                res.json(list.filter(item=>{
                    return ["法国菜","意大利菜","披萨","俄罗斯菜"].includes(item.style)
                }));
                break;
            case "日本料理":
                res.json(list.filter(item=>{
                    return ["寿司","居酒屋","日式火锅"].includes(item.style)
                }));
                break;
            case "小吃":
                res.json(list.filter(item=>{
                    return ["面食","麻辣烫","小龙虾","米粉/米线"].includes(item.style)
                }));
                break;
            case "韩国料理":
                res.json(list.filter(item=>{
                    return ["韩国烤肉","韩式火锅"].includes(item.style)
                }));
                break;
        }
        return
    } else {
        let result = list.filter(item => {
            return item.style === str
        })
        res.json(result);
        return
    }
})
//排序
app.get("/sortfilter", function (req, res) {

})

//多选筛选
app.post("/multifilter", express.json(), function (req, res) {

})

app.listen(5500, function () {
    console.log('服务器运行在  http://127.0.0.1:5500');
});