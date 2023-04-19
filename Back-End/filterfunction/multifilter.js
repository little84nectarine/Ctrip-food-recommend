module.exports = (rankarr, pricearr, list) => {
    let result = [];
    if (rankarr.length === 0 && pricearr.length === 0) {
        return list
    } else {
        //等级筛选
        if (rankarr.length === 0) {
            result = list
        } else {
            if (rankarr.includes("rank1")) {
                result = list.filter(item => {
                    return item.rank
                })
            } else {
                for (let i = 0; i < rankarr.length; i++) {
                    let rank = rankarr[i].match(/\d+(\.\d+)?/g)
                    let temp = list.filter(item => {
                        return item.rank === Number(rank)
                    })
                    result.push(...temp)
                }
            }
        }
        //价格筛选
        if (pricearr.length === 0) {
            return result
        } else {
            let templist = []
            pricearr.forEach(item => {
                let [min, max] = item.split("-")
                let temp = result.filter(element => {
                    return element.avgPrice >= Number(min) && element.avgPrice < Number(max)
                })
                templist.push(...temp)
            });
            return templist
        }
    }
}