import React from 'react'
import styles from "./Filtercard.module.scss"
import { useDispatch } from 'react-redux'
import { changefilterlist } from '../../../store/currFilter.slice'
import { restaruantApi } from '../../../request/api'
import { changeEnd } from '../../../store/islistEnd.slice'
import { restart } from '../../../store/currPagecount.slice'
import { multifilterApi } from '../../../request/api'
import { changelistloading } from '../../../store/listloading.slice'
import { changeList } from '../../../store/currList.slice'

const Filtercard = (props) => {
  const { text, size, borderR } = props
  const dispatch = useDispatch()
  const fast = () => {
    if (!size) {
      document.documentElement.scrollTop = 149
      switch (text) {
        case "2022榜单餐厅":
          dispatch(changefilterlist(["0-不限", "0-不限", [['rank1'], []], "默认"]))
          multifilterApi({ arr:["0-不限", "0-不限", [['rank1'], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
              if (res.status === 201) {
                dispatch(changeEnd(false))
              } else {
                dispatch(changeEnd(true))
              }
              dispatch(changeList([...res.data]))
              dispatch(restart())
              dispatch(changelistloading(false))
            })
          })
          break;
        case "川菜":
          dispatch(changefilterlist(["0-不限", "0-地方菜-川菜", [[], []], "默认"]))
          multifilterApi({ arr:["0-不限", "0-地方菜-川菜", [[], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
              if (res.status === 201) {
                dispatch(changeEnd(false))
              } else {
                dispatch(changeEnd(true))
              }
              dispatch(changeList([...res.data]))
              dispatch(restart())
              dispatch(changelistloading(false))
            })
          })
          break;
        case "西餐":
          dispatch(changefilterlist(["0-不限", "0-西餐", [[], []], "默认"]))
          multifilterApi({ arr:["0-不限", "0-西餐", [[], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
              if (res.status === 201) {
                dispatch(changeEnd(false))
              } else {
                dispatch(changeEnd(true))
              }
              dispatch(changeList([...res.data]))
              dispatch(restart())
              dispatch(changelistloading(false))
            })
          })
          break;
        case "人均100-300":
          dispatch(changefilterlist(["0-不限", "0-不限", [[], ['100-300']], "默认"]))
          multifilterApi({ arr:["0-不限", "0-不限", [[], ['100-300']], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
              if (res.status === 201) {
                dispatch(changeEnd(false))
              } else {
                dispatch(changeEnd(true))
              }
              dispatch(changeList([...res.data]))
              dispatch(restart())
              dispatch(changelistloading(false))
            })
          })
          break;
        case "火锅系列":
          dispatch(changefilterlist(["0-不限", "8-火锅系列", [[], []], "默认"]))
          multifilterApi({ arr:["0-不限", "8-火锅系列", [[], []], "默认"] }).then(e => {
            restaruantApi(0).then(res => {
              if (res.status === 201) {
                dispatch(changeEnd(false))
              } else {
                dispatch(changeEnd(true))
              }
              dispatch(changeList([...res.data]))
              dispatch(restart())
              dispatch(changelistloading(false))
            })
          })
          break;
      }
    }
  }
  return (
    <div className={styles.filtercardbox} style={{
      padding: size || "0.2rem 0.6rem", borderRadius: borderR || "0.6rem", backgroundColor: text === "2022美食林榜单餐厅" ? "rgb(253,238,238)" : "rgb(242,242,242)",
      color: text === "2022美食林榜单餐厅" ? "rgb(200,44,44)" : "#333"
    }} onClick={fast}>
      {text}
    </div>
  )
}

export default Filtercard