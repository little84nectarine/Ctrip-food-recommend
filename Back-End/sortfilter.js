module.exports = (str,list)=>{
    let result;
    if (str === "默认") {
        result = list
    } else if (str === "距离最近") {
        list.sort((a, b) => {
            if (a.distance < b.distance) {
                return -1;
            } else if (a.distance > b.distance) {
                return 1;
            } else if (a.distance == b.distance) {
                return 0;
            }
        })
        return list
    } else if (str === "人均最低") {
        list.sort((a, b) => {
            if (a.avgPrice < b.avgPrice) {
                return -1;
            } else if (a.avgPrice > b.avgPrice) {
                return 1;
            } else if (a.avgPrice == b.avgPrice) {
                return 0;
            }
        })
        return list
    } else if (str === "人均最高") {
        list.sort((a, b) => {
            if (a.avgPrice > b.avgPrice) {
                return -1;
            } else if (a.avgPrice < b.avgPrice) {
                return 1;
            } else if (a.avgPrice == b.avgPrice) {
                return 0;
            }
        })
        return list
    }
    return result
}