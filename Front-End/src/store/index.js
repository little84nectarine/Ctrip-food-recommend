// npm install @reduxjs/toolkit react-redux -S
import { configureStore } from '@reduxjs/toolkit'
// 导入 Reducer 进行使用
import currRestReducer from './currRest.slice'
import currListReducer from "./currList.slice"
import islistEndReducer from "./islistEnd.slice"
import currPagecountReducer from "./currPagecount.slice"
import currFilterReducer from "./currFilter.slice"
import listloadingReducer from "./listloading.slice"
import modalShowReducer from "./showModal.slice"
import currswipertextReducer from "./currswipertext.slice"
import comparelistReducer from "./comparelist.slice"
import collectlistReducer from "./collectlist.slice"
 
const store = configureStore({
  reducer: {
    currRest: currRestReducer,
    currList: currListReducer,
    islistEnd:islistEndReducer,
    currPagecount:currPagecountReducer,
    currFilter:currFilterReducer,
    listLoading:listloadingReducer,
    showModal:modalShowReducer,
    currSwipertext:currswipertextReducer,
    compareList:comparelistReducer,
    collectList:collectlistReducer
  },
})
 
export default store