// npm install @reduxjs/toolkit react-redux -S
import { configureStore } from '@reduxjs/toolkit'
// 导入 Reducer 进行使用
import currRestReducer from './currRest.slice'
import currListReducer from "./currList.slice"
 
const store = configureStore({
  reducer: {
    currRest: currRestReducer,
    currList: currListReducer
  },
})
 
export default store