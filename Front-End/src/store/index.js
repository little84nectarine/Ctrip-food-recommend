// npm install @reduxjs/toolkit react-redux -S
import { configureStore } from '@reduxjs/toolkit'
// 导入 Reducer 进行使用
import currRestReducer from './currRest.slice'
import currListReducer from "./currList.slice"
import islistEndReducer from "./islistEnd.slice"
import currPagecountReducer from "./currPagecount.slice"
import currFilterReducer from "./currFilter.slice"
import listloadingReducer from "./listloading.slice"
 
const store = configureStore({
  reducer: {
    currRest: currRestReducer,
    currList: currListReducer,
    islistEnd:islistEndReducer,
    currPagecount:currPagecountReducer,
    currFilter:currFilterReducer,
    listLoading:listloadingReducer
  },
})
 
export default store