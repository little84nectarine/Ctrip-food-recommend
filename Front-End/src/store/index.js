// npm install @reduxjs/toolkit react-redux -S
import { configureStore } from '@reduxjs/toolkit'
// 导入 Reducer 进行使用
import currRestReducer from './currRest.slice'
 
const store = configureStore({
  reducer: {
    currRest: currRestReducer
  },
})
 
export default store