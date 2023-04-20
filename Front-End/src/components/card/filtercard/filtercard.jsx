import React from 'react'
import styles from "./filtercard.module.scss"

const Filtercard = (props) => {
  const {text,size,borderR} = props
  const fast = ()=>{
    if(!size){
      switch(text){
        case "2022榜单餐厅":
          break;
        case "川菜":
          break;
        case "西餐":
          break;
        case "人均100-300":
          break;
        case "火锅系列":
          break;
      }
    }
  }
  return (
    <div className={styles.filtercardbox} style={{padding:size || "0.2rem 0.6rem",borderRadius:borderR || "0.6rem",backgroundColor:text==="2022美食林榜单餐厅"?"rgb(253,238,238)":"rgb(242,242,242)",
    color:text==="2022美食林榜单餐厅"?"rgb(200,44,44)":"#333"}} onClick={fast}>
        {text}
    </div>
  )
}

export default Filtercard