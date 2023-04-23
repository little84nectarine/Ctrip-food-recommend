import { distancelist, nationalarea, caixi, specialfood, sortselect } from "./static"
export const resetfilter = (...arg) => {
    let [filterlist,setLocation,setDistance,setArea,setFoodstyle1,setFoodstyle2,setFoodstyle3,setSpecialstyle,setSortselection] = arg
    if(filterlist[0]==='不限'){
        setLocation("距离")
        setDistance("不限")
    }else if(distancelist.includes(filterlist[0])){
        setDistance(filterlist[0])
    }else if(nationalarea.includes(filterlist[0])){
        setArea(filterlist[0])
    }
    if(filterlist[1]==='不限'){
        setFoodstyle1("菜系")
        setFoodstyle2("不限")
        setFoodstyle3("全部")
    }else if(Object.keys(caixi).includes(filterlist[1])){
        setFoodstyle2(filterlist[1])
        setFoodstyle3("全部")
    }else if(specialfood.includes(filterlist[1])){
        setFoodstyle1("特色菜")
        setSpecialstyle(filterlist[1])
    }else{
        Object.values(caixi).forEach((item,index)=>{
            if(item.includes(filterlist[1])){
                setFoodstyle1("菜系")
                setFoodstyle2(Object.keys(caixi)[index])
                setFoodstyle3(filterlist[1])
            }
        })
    }
    if(sortselect.includes(filterlist[3])){
        setSortselection(filterlist[3])
    }
}