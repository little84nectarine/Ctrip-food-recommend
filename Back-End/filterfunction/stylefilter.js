module.exports = (str,list)=>{
    let result;
    if (str.includes("不限")) {
        result = list;
    } else if (str.startsWith("8")) {
        //根据具体的一级菜系去判断
        switch (str.split("-")[1]) {
            case "火锅系列":
                result = list.filter(item=>{
                    return item.style.includes("火锅")
                });
                break;
            case "外国菜":
                result = list.filter(item=>{
                    return ["法国菜","意大利菜","披萨","俄罗斯菜","寿司","居酒屋","日式火锅","韩国烤肉","韩式火锅","西式快餐"].includes(item.style)
                });
                break;
            case "粉面":
                result = list.filter(item=>{
                    return ["面食","米粉/米线"].includes(item.style)
                });
                break;
        }
    } else if(str.split("-").length===2){
        switch(str.split("-")[1]){
            case "地方菜":
                result = list.filter(item=>{
                    return ["江浙菜","川菜","粤菜","湘菜"].includes(item.style)
                });
                break;
            case "快餐简餐":
                result = list.filter(item=>{
                    return ["西式快餐","中式快餐"].includes(item.style)
                });
                break;
            case "西餐":
                result = list.filter(item=>{
                    return ["法国菜","意大利菜","披萨","俄罗斯菜"].includes(item.style)
                });
                break;
            case "日本料理":
                result = list.filter(item=>{
                    return ["寿司","居酒屋","日式火锅"].includes(item.style)
                });
                break;
            case "小吃":
                result = list.filter(item=>{
                    return ["面食","麻辣烫","小龙虾","米粉/米线"].includes(item.style)
                });
                break;
            case "韩国料理":
                result = list.filter(item=>{
                    return ["韩国烤肉","韩式火锅"].includes(item.style)
                });
                break;
        }
    }else{
        result = list.filter(item => {
            return item.style === str.split("-")[2]
        })
    }
    return result
}
