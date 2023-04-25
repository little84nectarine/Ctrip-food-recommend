module.exports = (str,list)=>{
    let result;
    if (str.endsWith("不限")) {
        result = list;
    } else if (str.includes("区")) {
        result = list.filter(item => {
            return item.generalPosition.startsWith(str.split("-")[1])
        })
    } else {
        let dis = 0;
        if (str.includes("公里")) {
            dis = parseFloat(str.split("-")[1]) * 1000
        } else {
            dis = parseFloat(str.split("-")[1])
        }
        result = list.filter(item => {
            return item.distance <= dis
        })
    }
    return result
}