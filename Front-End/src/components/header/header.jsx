import React, { useEffect } from 'react'
import styles from "./header.module.scss"
import { restaruantApi } from '../../request/api'

const Header = () => {
  useEffect(() => {
    console.log("header 1");
    restaruantApi().then(res=>{
      console.log(res);
    })
  })

  return (
    <div className={styles.headerbox}>
      header搜索
    </div>
  )
}

export default Header